# Extra demo state for the helpdesk screenshots, on top of the plugin's own
# scripts/seed_screenshot_demo.rb. Run it on the SCREENSHOTS stack only:
#
#   tools/capture/prep/run.sh helpdesk
#
# The plugin seed deliberately never writes global settings, and on the dev
# stack the production restore used to supply them. On the clean stack nothing
# does, so three features would simply not render:
#
#   * the AI answer draft button needs the AI master switch, the answer-draft
#     switch and a "configured" client. The client points at 127.0.0.1:9, so a
#     request that escapes the capture script's mock fails at once instead of
#     reaching a real provider.
#   * the "original recipients" offer needs an incoming mail with Cc'd people.
#   * the attachment Block button needs attachments, i.e. a signature logo and
#     icons next to one real screenshot.
#   * the signature preview shows the central signature; without one it falls
#     back to the mailbox footer, which the seed leaves as the project name.
#
# Prints `VAR <name> <value>` lines; run.sh turns them into helpdesk.vars.json
# for the {placeholders} in shots.json. Re-runnable.

abort 'refusing to run without DEMO_STACK=1' unless ENV['DEMO_STACK'] == '1'

project = Project.find_by(identifier: 'screenshot') or abort 'run the helpdesk seed first'
user    = User.find_by(login: 'screenshot-demo') or abort 'capture user missing'
User.current = user

settings = Setting.plugin_redmine_expert_helpdesk.to_h.merge(
  'ai_enabled'        => '1',
  'ai_answer_enabled' => '1',
  'kb_enabled'        => '1',
  'ai_provider'       => 'custom',
  'ai_endpoint'       => 'http://127.0.0.1:9/v1',
  'ai_api_key'        => 'screenshots-dummy-key',
  'ai_model'          => 'demo-model',
  'global_footer'     => "--\nexpert Support\nExample Street 1 · 12345 Example City\n" \
                         "support@example.com · +49 30 1234567"
)
Setting.plugin_redmine_expert_helpdesk = settings
HelpdeskProjectSetting.for_project(project).update!(ai_answer_enabled: true)

# The hero ticket: open, with an AI summary AND knowledge-base proposals (the
# sidebar's "similar resolved tickets"). The attached screenshot is a scanner
# error, so the scanner ticket is preferred.
open_ids = Issue.open.where(project_id: project.id).pluck(:id)
with_ai  = HelpdeskAiSummary.where(issue_id: open_ids).pluck(:issue_id) &
           HelpdeskKbProposal.where(issue_id: open_ids).pluck(:issue_id)
hero = Issue.where(id: with_ai).where('subject LIKE ?', 'Scanner not recognised%').order(:id).last ||
       Issue.where(id: with_ai).order(:id).last or abort 'no open ticket with AI summary and KB proposals'

first_in = HelpdeskMessage.where(issue_id: hero.id, direction: 'in').order(:id).first
first_in.update_columns(
  recipient_to: [first_in.helpdesk_mailbox&.mailbox_address, 'it-support@example.com'].compact.join(', '),
  recipient_cc: 'lena.hoffmann@example.com, office@example.com'
)

IMG   = File.join(ENV.fetch('PREP_DIR', '/prep'), 'img')
FILES = %w[image001.png image002.png image003.png scanner-error.png].freeze
# From every ticket of the project, so a previous run's hero does not keep them.
Attachment.where(container_type: 'Issue', container_id: Issue.where(project_id: project.id).select(:id),
                 filename: FILES + %w[quota-warning.png]).destroy_all
FILES.each do |name|
  a = Attachment.new(container: hero, author: hero.author, filename: name,
                     content_type: 'image/png', file: File.binread(File.join(IMG, name)))
  a.save!
end

# Two resolved tickets on the same fault, cited as the draft's sources.
sources = Issue.where(project_id: project.id, subject: hero.subject)
               .joins(:status).where(issue_statuses: { is_closed: true }).order(id: :desc).limit(2).pluck(:id)
# The seed hands out proposals at random, so the scanner ticket would suggest
# a VPN fix. Point its two proposals — and the knowledge entries behind them —
# at the resolved scanner tickets the answer draft cites, with the same scores.
SOLUTIONS = [
  'Windows Update had replaced the scanner driver with a generic one. Reinstalling the ' \
  "manufacturer's full driver package brought the device back.",
  'The scanner was connected through an unpowered USB hub. Plugging it directly into the PC ' \
  'fixed the detection.'
].freeze
HelpdeskKbProposal.where(issue_id: hero.id).delete_all
sources.each_with_index do |src_id, k|
  entry = HelpdeskKnowledgeEntry.find_or_initialize_by(project_id: project.id, issue_id: src_id)
  entry.update!(problem: hero.subject, solution: SOLUTIONS[k], status: 'approved')
  HelpdeskKbProposal.create!(issue_id: hero.id, source_issue_id: src_id, score: [0.91, 0.84][k],
                             problem: hero.subject, solution: SOLUTIONS[k])
end

contact = HelpdeskTicketInfo.find_by(issue_id: hero.id)&.helpdesk_contact_id ||
          HelpdeskMessage.where(issue_id: hero.id).pick(:helpdesk_contact_id)

{ 'hero' => hero.id, 'contact' => contact,
  'mailbox' => HelpdeskMailbox.where(project_id: project.id).order(:id).pick(:id),
  'source1' => sources[0], 'source2' => sources[1] }.each { |k, v| puts "VAR #{k} #{v}" }
