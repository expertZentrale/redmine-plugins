---
layout: plugin
lang: en
ref: lightbox
plugin: lightbox
permalink: /lightbox/
title: expert Lightbox
description: >-
  Preview image and PDF attachments in a modal instead of navigating away.
  Native browser dialog, no jQuery, no third-party libraries, no view override.
  Redmine 5.1 to 7.0, GPL-2.0.
promise: >-
  Click an image or a PDF attachment and it opens in a modal, instead of
  navigating away from the page you were reading. Arrow keys, swipe and edge
  clicks step through everything else on the page.
intro: >-
  This exists because `redmine_x_lightbox2` stopped working on Redmine 6 and 7.
  It had overridden a core attachment view and leaned on the `icon-*` font
  classes that Redmine 7 removed. The replacement deliberately owns none of
  that: no view override, no controller patch, nothing that depends on core's
  attachment markup.

features:
  - kicker: Preview
    title: Images and PDFs, in place
    shot: 01-image-modal
    body: >-
      An image opens scaled to fit the viewport; a PDF opens in the browser's
      own PDF viewer. Anything else behaves exactly as it did before — the
      plugin does not interfere with files it cannot preview. `Esc` or a click
      on the backdrop closes it, and focus returns to the link you clicked.

  - kicker: Gallery
    title: Four ways through the set
    shot: 02-gallery
    body: >-
      Every previewable attachment on the page becomes a gallery in document
      order. Step through it with the arrow keys, the buttons in the top bar,
      the click zones at the left and right edge of the picture — invisible
      until you hover, always visible on touch — or a horizontal swipe. Mostly
      vertical drags still scroll the page, and `Ctrl`/`Cmd`/middle-click still
      opens the attachment in a new tab.

  - kicker: Everywhere
    title: No per-page allowlist
    shot: 03-wiki
    body: >-
      Issue attachments, journal thumbnails, inline wiki images, the Files and
      Documents modules, news and forum posts — and any third-party plugin page
      that links to an attachment, because detection keys only on the shape of
      attachment URLs rather than on a list of controllers we happened to think of.

why:
  - "**Zero dependencies.** Vanilla JavaScript and a native `<dialog>`, so `Esc`, focus trapping and the backdrop come from the browser. No jQuery, no Fancybox, no build step, no CDN request."
  - "**No view override and no controller patch.** It keys on URL shapes that have been stable across many Redmine majors, not on core's markup, CSS classes or icon fonts — which is exactly what broke its predecessor."
  - "**Zero configuration.** No migrations, no settings, no permissions."
  - "**It degrades to nothing.** On a browser without `<dialog>` the plugin stays inert and attachment links navigate normally."
  - "**The one server endpoint is deliberately narrow.** It serves a file inline only if the extension is on a fixed allowlist, sends `X-Content-Type-Options: nosniff` with a type taken from that allowlist rather than the upload's own metadata, and checks core's `Attachment#visible?` — so it grants nothing that the normal download route would not."

install:
  step1: "Download the release archive:"
  step2: "Unpack it into your Redmine's `plugins/` directory:"
  step3: ""
  step4: "Restart Redmine. There is nothing else to do — no module to enable, no permission to grant, no setting to configure."
  note: >-
    No migrations, so there is no migrate step and nothing to roll back. If you
    are replacing `redmine_x_lightbox2` or `redmine_lightbox2`, remove it first
    — two lightboxes on one page will both try to handle the click.
---

No gems, no migrations, no settings, no permissions. Works on any database,
because it does not add one.
