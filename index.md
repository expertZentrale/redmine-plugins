---
layout: home
lang: en
ref: home
permalink: /
description: >-
  Four open-source Redmine plugins from expert: an email helpdesk with SLA
  tracking, agile boards built on Redmine's own query system, Prometheus
  metrics, and attachment previews. GPL-2.0, tested on Redmine 5.1 to 7.0.
eyebrow: Open source · GPL-2.0 · Redmine 5.1 to 7.0
headline: Redmine, with the parts we kept wishing it had
subhead: >-
  An email helpdesk with SLA tracking, agile boards built on Redmine's own
  query system, Prometheus metrics, and attachment previews. Built at expert
  for the Redmine we run ourselves, released under the same licence as Redmine.
lead: >-
  Each of these started as something missing from our own installation. They
  are separate plugins — install one, or all four. None of them phones home,
  none needs a licence key, and none holds your data anywhere but in your own
  Redmine database.
cards:
  helpdesk: >-
    Mailboxes become a helpdesk. Incoming mail turns into a ticket, replies
    land on the ticket that already exists, and agents answer the customer
    without leaving Redmine. SLA, contacts and phishing detection on top.
  agile: >-
    A Kanban and Scrum board that is a Redmine query — every filter and
    column you already use applies unchanged. Story points, sprints, a
    backlog planner and five kinds of chart.
  metrics: >-
    Answers "can I restart Redmine right now?" — who is active, on an admin
    page and as Prometheus metrics on /metrics, with a Grafana dashboard.
    No configuration, no permissions.
  lightbox: >-
    Click an image or a PDF attachment and it opens in a modal instead of
    navigating away. Native browser dialog, no jQuery, no third-party
    libraries.
---

## Four plugins, one set of rules

We wrote these for a Redmine that people at expert use every day, which is the
only reason they look the way they do. The constraints we set ourselves are
worth knowing before you install anything:

- **The same licence as Redmine.** GPL v2 or later, because a Redmine plugin is
  loaded into the Redmine process and patches its classes — it is a derivative
  work, and we treat it as one. No per-server fee, no licence key, no tier that
  unlocks the feature you actually wanted.
- **Tested against every supported Redmine.** The suites run on Redmine 5.1,
  6.0, 6.1 and 7.0 on every push, and each plugin is additionally booted inside
  the official `redmine` Docker images for the same versions.
- **Nothing is fetched at runtime.** No CDN, no external font, no analytics
  beacon. Chart.js is vendored into the plugins that draw charts, and Agile
  vendors the Coloris colour picker; everything else is the Ruby standard
  library and what Redmine already ships.
- **Optional means off.** The AI features, the knowledge base and the phishing
  check all ship disabled. Turning one on is a deliberate act, and each one
  fails closed — a broken model response never mails your customer.
- **English and German throughout.** Both locales, both READMEs, both
  changelogs, and screenshots in both languages.
