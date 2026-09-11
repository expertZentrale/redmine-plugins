---
layout: page
lang: en
ref: compatibility
permalink: /compatibility/
title: Compatibility
description: >-
  Which expert Redmine plugin runs on which Redmine and Ruby version, which
  databases are supported, what gems each one needs, and which are covered by
  continuous integration.
lead: >-
  All four plugins declare a floor of Redmine 5.0 and are tested against the
  four versions below. Everything on this page is generated from the same data
  the plugin pages use, so it cannot drift away from them.
---

{% assign t = site.data.i18n[page.lang] %}
{% assign nav = site.data.nav[page.lang] %}
{% include compat-table.html
     t=t nav=nav
     h_versions="Redmine versions"
     h_testing="Testing"
     h_ruby="Ruby and database used in CI"
     h_ci_db="Database"
     h_requirements="Requirements"
     label_db_note="see below"
     note_versions="Where the Testing column says tested in CI, that plugin's suite runs against all four versions on every push and is additionally booted inside the official redmine Docker image for the same versions." %}

## A note on PostgreSQL

Three of the four plugins contain no database-specific SQL and run on MariaDB,
MySQL and PostgreSQL alike.

**expert Helpdesk is the exception.** Its SLA columns in the issue list compare
deadlines against `UTC_TIMESTAMP()`, which is MariaDB and MySQL syntax —
PostgreSQL has no such function. CI runs on MariaDB only, so PostgreSQL is not
merely untested there, it is known not to work for that feature. If you run
Redmine on PostgreSQL, the other three plugins are fine.

## Upgrading Redmine

None of these plugins pin a Redmine patch level. When you move between the
supported majors, replace the plugin directory with the current release and run
`rake redmine:plugins:migrate` for the plugins that have migrations
(helpdesk and agile always; metrics once; lightbox never). Release notes call
out any migration that needs attention.

## Installing more than one

They are independent and share no code, so any combination works. Two pairs are
worth knowing about:

- **expert Metrics and expert Helpdesk** cooperate: when both are installed,
  `/metrics` gains a `redmine_helpdesk_mails_total` counter broken down by
  project and direction. Neither requires the other.
- **expert Agile and another agile plugin** can be installed side by side —
  every class, table and route in ours is prefixed — but do not enable two
  agile modules on the same project.
