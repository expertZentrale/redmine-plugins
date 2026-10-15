# Ids for the agile screenshots, on top of the plugin's seed_screenshot_demo.rb.
#
#   tools/capture/prep/run.sh agile
#
# Changes nothing. Prints `VAR story <id>`: an in-progress story with points in
# the active sprint, whose edit form shows the Story points and Sprint fields;
# `VAR sprint <id>`, the active sprint; `VAR next_sprint <id>`, the one after it; `VAR story_tracker <id>`; and one `VAR <key> <id>` per saved board,
# backlog and chart, looked up by name — the seed recreates them on every run,
# so their ids are never the same twice.

abort 'refusing to run without DEMO_STACK=1' unless ENV['DEMO_STACK'] == '1'

project = Project.find_by(identifier: 'screenshot-agile') or abort 'run the agile seed first'
sprint  = ExpertAgileSprint.where(project_id: project.id).active.first ||
          ExpertAgileSprint.where(project_id: project.id).order(:start_date).last
story = Issue.joins(:tracker).where(project_id: project.id, trackers: { name: 'Story' })
             .open.where(id: ExpertAgileData.where(sprint_id: sprint.id).where.not(story_points: nil)
                                            .select(:issue_id))
             .order(:id).first or abort 'no story in the active sprint'
puts "VAR story #{story.id}"
puts "VAR sprint #{sprint.id}"
next_sprint = ExpertAgileSprint.where(project_id: project.id, status: ExpertAgileSprint::STATUS_OPEN)
                               .order(:start_date).first or abort 'no open sprint after the active one'
puts "VAR next_sprint #{next_sprint.id}"
puts "VAR story_tracker #{Tracker.find_by!(name: 'Story').id}"

{ 'board' => 'Sprint board', 'lanes' => 'Sprint board by assignee',
  'epic_lanes' => 'Sprint board by epic', 'epic_planning' => 'Epic planning',
  'burndown' => 'Sprint 24 burndown', 'velocity' => 'Velocity, last 60 days',
  'flow' => 'Cumulative flow, last 60 days' }.each do |key, name|
  query = Query.where(project_id: project.id, name: name).where("type LIKE 'ExpertAgile%'").first
  abort "no saved query #{name.inspect} — re-run the agile seed" if query.nil?
  puts "VAR #{key} #{query.id}"
end
