---
layout: plugin
lang: en
ref: metrics
plugin: metrics
permalink: /metrics/
title: expert Metrics
description: >-
  See who is working in Redmine right now, on an admin page and as Prometheus
  metrics on /metrics, with a Grafana dashboard. No configuration, no
  permissions, no gems. Redmine 5.1 to 7.0, GPL-2.0.
promise: >-
  Answers one question well: can I restart Redmine right now? It shows who has
  been active in the last hour on an admin page, and exposes the same picture
  as Prometheus metrics for your monitoring.
intro: >-
  Every Redmine operator has guessed at this. You want to deploy, or restart a
  pod, or run a migration, and the only honest answer available is "probably
  nobody is on it". This plugin turns that into a number — and then into a graph,
  because the number is more useful with yesterday next to it.

features:
  - kicker: Right now
    title: Who is actually in there
    shot: 01-active-users
    body: >-
      An **expert Metrics** entry in the Administration menu lists every user
      with a request in the last 60 minutes, most recent first: login, name,
      last activity as "3 min ago", logged in since, and how many sessions they
      hold. A summary box above it counts active users over 5, 15 and 60
      minutes, live sessions, and logins in the last 24 hours. The page
      refreshes itself every minute.

  - kicker: Scripting
    title: The same answer, as JSON
    shot: 02-json
    body: >-
      `/admin/active_users.json` returns the same data for a script, authorised
      with an admin API key. A one-line `curl | jq '.summary.active_users'` in
      front of your deployment job turns "probably nobody" into a gate.

  - kicker: Monitoring
    title: Prometheus on /metrics
    shot: 03-metrics-endpoint
    body: >-
      Standard text exposition, aggregate numbers only — **never user names**.
      Active users per window, live sessions, recent logins, user, project and
      issue totals, notification mail sent per project, and helpdesk customer
      mail per project and direction when the helpdesk plugin is installed.
      Open by default; set a token in `configuration.yml` to require a bearer
      token instead, and it keeps answering even with "Authentication required"
      switched on.

  - kicker: Grafana
    title: A dashboard that already knows the traps
    shot: 04-grafana
    body: >-
      Import the shipped JSON, pick your Prometheus datasource, done. Rows for
      *Right now*, *Users, projects and issues*, *Mail* and *Scrape health*,
      plus two text panels explaining how to read it. The Kubernetes trap is
      baked in: every pod reports the same database-wide numbers, so the
      dashboard aggregates with `max` rather than `sum`, and joins `up` against
      a 24-hour lookback so a dead target shows as 0 instead of going stale.

why:
  - "**Zero configuration and zero permissions.** No settings page, no roles to grant. It works the moment it loads."
  - "**No new tracking table for activity.** It reads Redmine's own `tokens` rows, so it makes no assumption about your session store — cookie, Redis or database all work."
  - "**It counts honestly.** API-key requests and the mail fetcher never create a session token, so they are not reported as a person being active."
  - "**One snapshot serves every scrape.** Results are cached for 15 seconds, so a fleet of pods scraped every few seconds costs one set of queries."
  - "**Mail counters survive restarts.** Notification mail is counted through an observer into a real table with an atomic increment, shared by every pod — not held in a process-local counter that resets on deploy."
  - "**It degrades instead of failing.** `/metrics` keeps answering on a freshly installed, un-migrated plugin, and helpdesk metrics appear only once that plugin's table exists."

install:
  step1: "Download the release archive:"
  step2: "Unpack it into your Redmine's `plugins/` directory:"
  step3: "Run the migration:"
  step4: "Restart Redmine. The **expert Metrics** entry appears in Administration immediately, and `/metrics` starts answering — there is nothing to configure."
  note: >-
    `/metrics` is **open by default**, which is right behind a private network
    and wrong on the public internet. Set `metrics_token` in your
    `config/configuration.yml` to require `Authorization: Bearer <token>`;
    administrators always pass regardless.
---

No gems, no settings, no permissions, one migration. Works on MariaDB, MySQL
and PostgreSQL, and with any session store.

The Grafana dashboard lives at `contrib/grafana/redmine-expert-metrics.json` in
the repository.
