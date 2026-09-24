# Ids for the agile screenshots, on top of the plugin's seed_screenshot_demo.rb.
#
#   tools/capture/prep/run.sh agile
#
# Changes nothing. Prints `VAR story <id>`: an in-progress story with points in
# the active sprint, whose edit form shows the Story points and Sprint fields.

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
