# redmine-plugins

Source for <https://redmine-plugins.expert.de> — the public site for the four
open-source Redmine plugins published by expert.

| Plugin | Repository |
| --- | --- |
| expert Helpdesk | [expertZentrale/redmine_expert_helpdesk](https://github.com/expertZentrale/redmine_expert_helpdesk) |
| expert Agile | [expertZentrale/redmine_expert_agile](https://github.com/expertZentrale/redmine_expert_agile) |
| expert Metrics | [expertZentrale/redmine_expert_metrics](https://github.com/expertZentrale/redmine_expert_metrics) |
| expert Lightbox | [expertZentrale/redmine_expert_lightbox](https://github.com/expertZentrale/redmine_expert_lightbox) |

This repository holds the website only. The plugins themselves, their READMEs,
their changelogs and their issue trackers live in the repositories above.

## Running it locally

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://127.0.0.1:4000>.

To reproduce the deployed URL shape exactly — useful when checking links — pass
the same base path CI derives:

```bash
bundle exec jekyll serve --baseurl /redmine-plugins   # -> /redmine-plugins/
```

`baseurl` is **not** set in `_config.yml`; the workflow computes it from whether
a `CNAME` file exists. Project Pages serve the site from `/<repo>`, a custom
domain serves it from the root, so adding the domain later is one new file and
no link edits.

## How it is put together

**Prose lives in the Markdown pages; facts live in `_data/`.** Long copy inside
YAML is miserable to edit, and a translation duplicates prose anyway — but a
version number, a Redmine compatibility claim or a gem list must have exactly
one source, or the four plugin pages and the compatibility matrix drift apart.

| Path | What it is |
| --- | --- |
| `index.md`, `helpdesk.md`, … | English pages. Front matter carries the feature blocks; the body carries free-form prose. |
| `de/` | The German pages. Paired to their English counterpart by the `ref` field, which is what drives the language switch. |
| `_data/plugins.yml` | Hand-maintained facts: repo, licence, Redmine and Ruby versions, databases, gems, migrations, bundled components. |
| `_data/i18n.yml` | Navigation, button and footer strings. Both languages are kept key-for-key in sync. |
| `_data/nav.yml` | Per-language URLs. The German slugs are translated, so there is no rule to derive them. |
| `_data/releases.yml` | **Generated** by `script/fetch-releases.rb`. Committed so a local build and the first deploy work; CI regenerates it each time. |
| `_data/shots.yml` | **Generated** by `tools/index-shots.py`. Real screenshot dimensions, so every `<img>` reserves the right box. |

## Regenerating things

```bash
# Latest release per plugin, from the GitHub API
ruby script/fetch-releases.rb

# Screenshots: read a plugin repo's docs/screenshots/, write optimised WebP
tools/optimise-shots.sh helpdesk ../redmine_expert_helpdesk

# The logo family — logo.svg + PNGs per plugin, and the square site marks
python3 tools/logo/build-logos.py
```

`tools/logo/out/` is the input for each plugin's own `docs/redmine_org/`
directory listing; only the square marks under `assets/img/logo/` are used by
the site.

## Deployment

`.github/workflows/pages.yml` builds and deploys on every push to `main`, on a
weekly cron (so version numbers stay current without anyone remembering), and on
`workflow_dispatch`. It also accepts a `repository_dispatch` of type
`plugin-released`, so a plugin's own release workflow can refresh the site the
moment a tag lands:

```bash
gh api repos/expertZentrale/redmine-plugins/dispatches \
  -f event_type=plugin-released
```

The build fails on a dead internal link or a missing image. External links are
checked on the weekly run only, so a rate-limited third party cannot block a
content deploy.

## Two things worth not breaking

- **"expert" is always lowercase** in user-facing text — the company name, in
  every language, even at the start of a sentence. Code identifiers are normal.
- **Nothing is fetched from a third party at runtime.** Nunito is self-hosted
  under `assets/fonts/`; there is no CDN, no analytics and no embed. That is
  what lets the privacy page say so and mean it, so please keep it true.

## Licence

The site content is © expert. The plugins it describes are published under the
GNU General Public License v2 or later.
