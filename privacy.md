---
layout: legal
lang: en
ref: privacy
permalink: /privacy/
title: Privacy
description: >-
  What this website collects, which it is: nothing. No cookies, no analytics,
  no third-party requests. Hosting is GitHub Pages.
---

<div class="callout" markdown="1">
**Scaffold.** The factual description below is accurate for the site as built,
but the controller identification and the rights section need the same company
details as the [imprint]({{ '/imprint/' | relative_url }}), and the whole page
should be reviewed before the site goes live on a public domain.
</div>

## The short version

This is a static website. It sets no cookies, runs no analytics, embeds nothing
from third parties, and has no forms, no login and no comment function. Nothing
you do here is recorded by us.

## Controller

TODO — legal company name, address and contact, matching the imprint.
Data protection officer: TODO — name and contact, if one is appointed.

## Hosting

The site is hosted on **GitHub Pages**, operated by GitHub Inc., 88 Colin P.
Kelly Jr. Street, San Francisco, CA 94107, USA.

When you open a page, your browser necessarily sends GitHub your IP address
along with the request, and GitHub records it in its server logs. GitHub states
that it uses these logs for security purposes and retains them for a limited
period. We have no access to them and cannot switch them off. This is described
in GitHub's own
[Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
and, for Pages specifically, in the
[GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection).

Legal basis: Art. 6 (1) (f) GDPR — our legitimate interest in making the site
available securely. GitHub is certified under the EU-U.S. Data Privacy
Framework.

## What this site does not do

These are properties of how the site is built, not promises about intent:

- **No cookies.** The site sets none, of any kind. There is no consent banner
  because there is nothing to consent to.
- **No analytics.** No Google Analytics, no Matomo, no pixel, no beacon.
- **No third-party requests.** Every font, stylesheet, script and image is
  served from this site's own domain. In particular the Nunito typeface is
  self-hosted rather than loaded from Google Fonts, so your IP address is not
  passed to Google for that.
- **No embedded content.** No videos, no maps, no social widgets, no iframes.
- **No forms.** Nothing here collects a name, an address or a message.

You can verify all of this: open your browser's network tab and reload. Every
request goes to this domain.

## Leaving this site

Links to GitHub, redmine.org and other sites are ordinary links. Once you
follow one, that site's own privacy policy applies and we have no influence
over what it collects. If you download a plugin release, report an issue or
read the source, you are doing that on GitHub under GitHub's terms.

## Your rights

Under the GDPR you have the right of access (Art. 15), rectification (Art. 16),
erasure (Art. 17), restriction of processing (Art. 18), data portability
(Art. 20) and objection (Art. 21), and the right to lodge a complaint with a
supervisory authority (Art. 77).

Since this site stores no personal data of its own, a request for access or
erasure would concern only GitHub's server logs, which you would need to
address to GitHub.

TODO — confirm the contact route for exercising these rights, and name the
competent supervisory authority.

## About the software

The plugins described here run on **your** Redmine, on your own infrastructure.
They send nothing to us, contact no licence server, and have no telemetry. Any
personal data they process — tickets, contacts, user activity — stays in your
own database and is processed under your own responsibility as controller.

Two features deserve a specific mention because they can send data outside your
infrastructure, both of which ship **disabled**:

- **AI summaries, the knowledge base and the completeness check** in expert
  Helpdesk send ticket text and, if you configure it, attachments to whichever
  AI provider you point them at. Where that provider sits and what it does with
  the data is between you and them — which is why the plugin also supports a
  self-hosted, OpenAI-compatible endpoint.
- **Phishing detection** downloads public URL feeds to a local mirror and
  checks links against that mirror. The links from your mail are not sent
  anywhere; the matching happens in your own database.

## Changes

This page describes the site as it is currently built. If the site ever gains
something that collects data, this page changes first.
