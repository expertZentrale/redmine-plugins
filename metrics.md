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
    caption: >-
      Administration → expert Metrics: active users over 5, 15 and 60 minutes,
      live sessions and logins in the last 24 hours, above a table of everyone
      with a request in the last hour — login, name, last activity, logged in
      since, and how many sessions they hold.
    body: >-
      An **expert Metrics** entry in the Administration menu lists every user
      with a request in the last 60 minutes, most recent first: login, name,
      last activity as "3 min ago", logged in since, and how many sessions they
      hold. A summary box above it counts active users over 5, 15 and 60
      minutes, live sessions, and logins in the last 24 hours. The page
      refreshes itself every minute.

  - kicker: Scripting
    title: The same answer, as JSON
    body: |-
      `/admin/active_users.json` returns the same data for a script, authorised
      with an admin API key — so "probably nobody is on it" becomes a gate your
      deployment job can actually check.

      ```bash
      curl -sH "X-Redmine-API-Key: $KEY" \
           https://redmine.example.com/admin/active_users.json \
        | jq '.summary.active_users["5m"]'
      ```

      ```json
      {
        "collected_at": "2026-09-13T09:27:25Z",
        "window_minutes": 60,
        "summary": {
          "active_users": { "5m": 2, "15m": 6, "60m": 9 },
          "sessions": 14,
          "recent_logins_24h": 11,
          "users": { "active": 14, "registered": 1, "locked": 1 },
          "projects_active": 4,
          "issues_open": 76,
          "issues_closed": 387
        },
        "active_users": [
          { "login": "a.berger", "name": "Anna Berger",
            "last_activity": "2026-09-13T09:23:34Z", "sessions": 2 }
        ]
      }
      ```

  - kicker: Monitoring
    title: Prometheus on /metrics
    body: |-
      Standard text exposition, aggregate numbers only — **never user names**.
      Open by default; set a token in `configuration.yml` to require a bearer
      token instead, and it keeps answering even with "Authentication required"
      switched on.

      ```
      redmine_active_users{window="5m"} 3
      redmine_active_users{window="15m"} 5
      redmine_active_users{window="60m"} 8
      redmine_sessions_total 12
      redmine_recent_logins_users{window="24h"} 10
      redmine_users_total{status="active"} 14
      redmine_users_total{status="locked"} 1
      redmine_projects_total{status="active"} 4
      redmine_issues_total{state="open"} 76
      redmine_issues_total{state="closed"} 387
      redmine_notifications_sent_total{project="customer-support"} 412
      redmine_helpdesk_mails_total{project="customer-support",direction="in"} 148
      redmine_helpdesk_mails_total{project="customer-support",direction="out"} 131
      redmine_info{redmine_version="7.0.0.stable",plugin_version="1.1.1"} 1
      ```

      The helpdesk lines appear only when expert Helpdesk is installed; neither
      plugin requires the other.

  - kicker: Grafana
    title: A dashboard that already knows the traps
    shot: 04-grafana
    caption: >-
      The dashboard over a working week: active users across the three windows,
      logged-in sessions, accounts by status, open and closed issues, and
      customer versus notification mail per hour. Panel titles are English.
    body: |-
      Import the JSON, pick your Prometheus datasource, done. Rows for *Right
      now*, *Users, projects and issues*, *Mail* and *Scrape health*, plus two
      text panels explaining how to read it. The Kubernetes trap is baked in:
      every pod reports the same database-wide numbers, so the dashboard
      aggregates with `max` rather than `sum`, and joins `up` against a 24-hour
      lookback so a dead target shows as 0 instead of going stale.

      **Merged, but not in the current release yet** — it ships with the next
      one. Everything it draws is already exposed by `/metrics` today, so the
      plugin is useful without it.

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

The Grafana dashboard is merged but not yet part of
{{ site.data.releases.metrics.tag }}; it ships as
`contrib/grafana/redmine-expert-metrics.json` with the next release.
