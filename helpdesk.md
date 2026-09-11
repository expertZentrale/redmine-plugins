---
layout: plugin
lang: en
ref: helpdesk
plugin: helpdesk
permalink: /helpdesk/
title: expert Helpdesk
description: >-
  Turn Microsoft 365 or IMAP mailboxes into a Redmine helpdesk: mail becomes
  tickets, replies match the existing ticket, agents answer from the ticket
  page. SLA in business minutes, contacts, phishing detection, optional AI.
promise: >-
  Turns mailboxes into a helpdesk. Incoming mail becomes a ticket, customer
  replies land on the ticket that already exists, and your agents answer from
  the ticket page — inside Redmine, in the customer's own mail thread.
intro: >-
  Most Redmine helpdesk setups break in the same place: a customer replies, and
  the reply becomes a second ticket. This plugin hands every incoming message to
  Redmine's own `MailHandler`, so `In-Reply-To` headers and `[#id]` subject
  patterns behave exactly as they do for Redmine's built-in mail handling —
  attachments included. Everything else is layered on top of that.

features:
  - kicker: Mail in
    title: A mail arrives, a ticket appears
    shot: 04-issue-detail
    caption: >-
      Ticket page with the helpdesk info bar: sender name and address, the origin mailbox, and two green SLA chips for reaction and solution time.
    body: >-
      Each project points at its own mailboxes and sets what new tickets get:
      tracker, priority, status, and what to do about senders who have no
      Redmine account. The original message is archived on the ticket as a
      `.eml` attachment, and the signature logos and screenshots that mail
      clients reference as `[cid:image001.png]` are rewritten to point at the
      attachment Redmine just stored — so the ticket reads like the mail did,
      not like a row of markers.

  - kicker: Mail out
    title: Answer the customer from the ticket
    shot: 06-reply
    caption: >-
      Reply panel inside the ticket edit form: a "send as email to customer" checkbox with the recipient, To/CC/BCC fields, and a preview of the signature.
    body: >-
      The normal Redmine note field, plus a panel that sends it as a real mail
      through the mailbox itself — so a copy lands in Sent and the mailbox holds
      both halves of the conversation. Quote the original mail or the whole
      thread (private notes never among them), insert a stored answer template
      with its macros already filled in, drop in inline images, and autocomplete
      To/CC/BCC from the project's contacts.

  - kicker: Any provider
    title: Microsoft 365, or any IMAP server
    shot: 08-mailbox-form
    caption: >-
      Mailbox configuration with address and folders, defaults for new tickets, reopening rules, sender and auto-reply filters, autoresponder text, and reply templates with a signature preview.
    body: >-
      Each mailbox picks its own backend: Microsoft Graph for Microsoft 365, or
      generic IMAP in and SMTP out for Google Workspace, Exchange on-premises,
      Dovecot, Zimbra and ordinary hosters. Authentication is OAuth2/XOAUTH2
      with three grants — application-only, one-time consent, and service
      account — with username and password over TLS still available where
      there is no OAuth2. A **Test connection** button checks host, TLS and
      login before you save, and lists the folders it can see.

  - kicker: SLA
    title: Deadlines in business minutes, not wall-clock hours
    shot: 01-sla-dashboard
    caption: >-
      SLA statistics: tickets open, closed and breached, a compliance bar chart, monthly ticket volume, average times over time, and busiest hours and weekdays.
    body: >-
      Reaction and solution targets are measured against the project's own
      working days and hours, with per-priority overrides for the tickets that
      cannot wait. Both clocks show as traffic-light chips on the ticket and as
      sortable columns in the issue list, so a queue can be ordered by urgency
      at a glance. Breaches notify an escalation address through a cron
      endpoint, and an SLA statistics tab charts compliance over time.

  - kicker: Reporting
    title: Where the time actually goes
    shot: 11-ticket-dashboard
    caption: >-
      Ticket statistics: open, closed, reopened and awaiting response, first response and resolution times, time in status, conversation length, and tables per agent and per customer.
    body: >-
      A ticket statistics tab for every helpdesk project, SLA or not, behind its
      own permission so you can give it to a team lead and nobody else. Volume,
      first response and resolution times, time spent in each status, reopens,
      conversation length, a table per agent and a table per customer, busiest
      hours and weekdays — on calendar time, or on the project's business hours.

  - kicker: Customers
    title: Every sender becomes a contact
    shot: 03-contacts
    caption: >-
      Customer list of a helpdesk project: a searchable, paginated table with name, email address, company, phone number, ticket count, and date of the last ticket.
    body: >-
      Senders are saved automatically and listed per project with company,
      phone and ticket count. The ticket page gets a customer card with their
      earlier tickets and the replies already sent, the issue list gets sortable
      **Customer** and **Customer email** columns with a filter matching either,
      and any manually created ticket can have a contact attached — optionally
      sending the first outbound mail as you do it.

  - kicker: Optional
    title: AI summaries and a knowledge base, off by default
    shot: 02-ai-dashboard
    caption: >-
      AI statistics: request count, token usage, success rate and latency, with charts for request volume, tokens over time, success versus failure, request type, provider model, and busiest times.
    body: >-
      A hard-to-read forwarded thread can be summarised into a private internal
      note by OpenAI, Anthropic, or any OpenAI-compatible endpoint you host
      yourself. Resolved tickets can be distilled into a per-project knowledge
      base — Qdrant or pgvector — and new mail retrieves solutions from it, with
      strict isolation so one project never sees another's. A separate
      completeness check mails the customer for the details a one-line "printer
      is broken" ticket left out. All of it ships disabled, all of it runs in
      background jobs, and the AI paths fail closed.

why:
  - "**Coexists with what you already run.** Two core helpers are patched by capturing the original method rather than `prepend`/`super`, specifically so the plugin survives alongside older plugins that extend the same helpers with `alias_method_chain`."
  - "**Reply matching is not reinvented.** Threading is Redmine's `MailHandler`, so it behaves the way the rest of your Redmine already does."
  - "**Nothing silently reprocesses.** Ingested mail moves to a processed folder, rejected mail to skipped, errors to failed. One broken message never aborts a fetch run."
  - "**Secrets are encrypted at rest** and write-only over the REST API — you can set a client secret, you can never read one back."
  - "**No scheduler of its own.** Fetching is a button, or an API-key-secured endpoint you point cron or a Kubernetes CronJob at. Your scheduler stays in charge."
  - "**Full REST API**, JSON and XML, following Redmine's own conventions and scoped by the permissions you already granted."

install:
  step1: "Download the release archive:"
  step2: "Unpack it into your Redmine's `plugins/` directory:"
  step3: "Run the migrations:"
  step4: "Restart Redmine, then enable the **expert Helpdesk** module on a project and add a mailbox in the project's settings."
  note: >-
    Mail provider setup — the Microsoft 365 app registration, or OAuth2 against
    your own IMAP server — is the one part that takes real configuration. The
    [README](https://github.com/expertZentrale/redmine_expert_helpdesk#readme)
    has recipes for Microsoft application-only IMAP, Google Workspace consent
    and self-hosted servers, plus PowerShell scripts for the Azure side.
---

Requires **MariaDB or MySQL**. The SLA columns in the issue list compare
against `UTC_TIMESTAMP()`, which PostgreSQL does not have; CI runs on MariaDB
only, so PostgreSQL is untested here. The other three plugins are
database-agnostic.

`base64` is declared as a plugin gem — it stopped being a Ruby default gem in
Ruby 4.0, which is what Redmine 7 runs on. `pdf-reader` is optional and only
used to extract text from PDF attachments for AI summaries; without it those
attachments are simply skipped. The pgvector knowledge-base backend needs
`pg` in your deployment, which the default Qdrant backend does not.
