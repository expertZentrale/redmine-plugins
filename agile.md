---
layout: plugin
lang: en
ref: agile
plugin: agile
permalink: /agile/
title: expert Agile
description: >-
  Kanban and Scrum boards for Redmine built on Redmine's own query system, with
  story points, first-class sprints, a backlog planner and burndown, burnup,
  velocity, cumulative-flow and cycle-time charts. GPL-2.0.
promise: >-
  A Kanban and Scrum board that *is* a Redmine query. Every filter, column,
  grouping and visibility rule you already use on the issue list applies to the
  board unchanged — and a saved board is one row in Redmine's own queries table.
intro: >-
  Agile plugins usually build a second, parallel world: their own filters, their
  own permissions, their own idea of which issues you are allowed to see. This
  one does not. The board is an `IssueQuery` subclass, so it inherits Redmine's
  filtering, sorting, grouping and visibility rules wholesale, and the board
  settings ride along in the query's own options column.

features:
  - kicker: The board
    title: Columns are your issue statuses
    shot: 01-board
    caption: >-
      Agile board with five status columns — To do, In Progress, a merged Dev header spanning the Review and Test sub-columns, and Done. Each header carries its card count and WIP limit; Review is flagged for holding five cards against a limit of four.
    body: >-
      Drag a card to change its status. Columns come from the statuses you
      already have, with optional advisory WIP limits that flag an overloaded
      column without ever blocking a move. Statuses sharing a `Prefix:` naming
      convention merge under one header. Cards show whichever fields you pick —
      assignee with avatar, story points or estimated hours, percent done, a
      description excerpt, and any query column including custom fields.

  - kicker: Swimlanes
    title: One lane per person, or per anything else
    shot: 02-board-swimlanes
    caption: >-
      The same board grouped into swimlanes by assignee: one labelled band per team member plus a band for unassigned issues, each spanning all five status columns.
    body: >-
      Any field the query can group by becomes a horizontal lane — assignee,
      tracker, priority, category — each with its own issue count and
      story-point total. Boards can be saved privately or shared with the
      project, and a parent project's board carries its subprojects' issues.

  - kicker: Estimates
    title: Story points where Redmine expects them
    shot: 05-story-points
    caption: >-
      Issue form showing Redmine's own attribute fields above two added by the plugin: a Story points dropdown set to 5, and a Sprint dropdown set to Sprint 24.
    body: >-
      Stored per issue in the plugin's own table rather than smuggled into a
      custom field, offered as a configurable value list (modified Fibonacci by
      default) and restrictable to the trackers where they make sense. They
      appear on the issue form, in the attribute table, in bulk edit, and as a
      sortable, filterable, groupable column on the issue list.

  - kicker: Sprints
    title: Sprints are a real thing, not a renamed version
    shot: 04-sprints
    caption: >-
      Sprints tab in the project settings listing five sprints with status, start and due date: one active, one open, and three closed.
    body: >-
      Name, description, start and end date, and an open → active → closed
      lifecycle: activating a sprint stands the previous one down, and a sprint
      cannot be closed while it still holds open issues. Sharing works the way
      Redmine versions do, from "not shared" up to the whole project tree.
      Deleting a sprint unassigns its issues — it never deletes them. Redmine's
      own versions stay usable for release planning alongside.

  - kicker: Planning
    title: A backlog you can actually drag things out of
    shot: 03-backlog
    caption: >-
      Backlog planner with a Sprints and a Versions tab: a Backlog lane on the left and one lane per available sprint beside it, each headed by its issue count, story-point total, date range, and days remaining.
    body: >-
      The backlog on the left, one lane per sprint beside it, and a second tab
      that plans into Redmine versions instead. Each lane is headed by its issue
      count, story-point total, date range and days remaining. It has the same
      filter panel and card fields as the board, saves named backlogs, and
      remembers where you were when you come back to it.

  - kicker: Charts
    title: Five charts, from what actually happened
    shot: 06-chart-burndown
    caption: >-
      Burndown over a sprint in story points: the remaining line descends from 200 points and stops at today, above a dashed ideal line falling to zero at the sprint end. The sidebar lists saved charts and the project sprints.
    body: >-
      Burndown, burnup, velocity, cumulative flow and cycle time — in issues,
      hours or story points, by day, week or month. History is replayed from the
      issue journals rather than sampled nightly, so a chart you generate today
      is right about last month. Measured lines stop at today; the ideal line
      runs to the end of the range and can skip weekends.

why:
  - "**We wanted something simpler, and no more paid plugins.** That is the whole reason it exists. It is GPL-2.0-or-later like the rest: no licence key, no fee per server, nothing to renew."
  - "**Board order is computed on the server** as a fractional rank. A move sends only the dragged card and its two neighbours and writes one row. Browser-side re-indexing of a whole column corrupts order under concurrent drags and silently reorders cards paginated out of view."
  - "**Chart history is reconstructed in a single pass** over one journal query, then cached — not by re-scanning every issue's journals once per date bucket."
  - "**No inline JavaScript.** Views render markup and data crosses into the browser through a JSON island, so the board works under a `script-src 'self'` content security policy."
  - "**Workflow refusals tell you why.** A move your workflow forbids names the tracker and both statuses, lists the transitions that *are* open, and offers admins a link straight to that tracker's workflow."
  - "**The REST API writes, not just reads** — story points and sprint assignment are both writable, and sprints have full CRUD."

install:
  step1: "Download the release archive:"
  step2: "Unpack it into your Redmine's `plugins/` directory:"
  step3: "Run the migrations:"
  step4: "Restart Redmine, then enable the **expert Agile** module on a project. The backlog planner is a second module, **expert Agile Backlog**, so you can hand it out separately."
  note: >-
    It can be installed alongside another agile plugin — every class, table and
    route of ours is prefixed to avoid collisions — but **enabling two agile
    modules on the same project is not supported**. Story points and sprints are
    off until you turn them on in the plugin settings.
---

No additional gems. Chart.js and the Coloris colour picker are vendored with the
plugin, and drag and drop uses
the jQuery UI that Redmine already ships, so nothing is fetched at runtime.
Works on MariaDB, MySQL and PostgreSQL.
