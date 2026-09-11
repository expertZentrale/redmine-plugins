#!/usr/bin/env python3
"""Generate the plugin logo family.

The agile plugin already had a logo (plugins/redmine_expert_agile/docs/
redmine_org/logo.svg). Its geometry IS the house style, so it is reproduced
here exactly rather than redrawn, and the three siblings inherit every shared
element: the striped expert star at 5%, the ringed circle, the segmented
#CD291F arc, and the Nunito wordmark.

Two variants come out per plugin, because one file cannot do both jobs:

  logo.svg  100x100, with the "expert / <Name> / for Redmine" wordmark.
            For the redmine.org plugin directory and the READMEs.
  mark.svg  glyph only, cropped square to the circle. For the website, where
            the wordmark renders at 42px and would be illegible mush.

Usage:  python3 tools/logo/build-logos.py
"""

import pathlib
import subprocess

ORANGE, RED, SALMON, INK, INK2 = '#F04C00', '#CD291F', '#F58C66', '#3F4245', '#525557'
WORD_ORANGE = '#EE4100'

# --- shared frame -----------------------------------------------------------

def ring():
    """The ringed circle and the segmented arc only, on transparency."""
    return f'''  <circle cx="50" cy="38" r="26.5" fill="none" stroke="{ORANGE}" stroke-width="2.6"/>

  <!-- red segmented arc (family element) -->
  <path d="M 32.5 25.5 A 21.5 21.5 0 0 1 67.5 25.5"
        fill="none" stroke="{RED}" stroke-width="5.4"
        stroke-dasharray="6.2 2.55"/>
'''


def frame(x, y, w, h):
    """White ground, striped expert-star watermark, ringed circle, segmented arc."""
    return f'''  <rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#ffffff"/>

  <!-- faint expert-star watermark, striped -->
  <g fill="{ORANGE}" opacity="0.05">
    <polygon points="50,2 88,68 12,68"/>
    <polygon points="50,74 12,8 88,8"/>
  </g>
  <g fill="#ffffff">
    <rect x="0" y="12" width="100" height="2.4"/>
    <rect x="0" y="24" width="100" height="2.4"/>
    <rect x="0" y="36" width="100" height="2.4"/>
    <rect x="0" y="48" width="100" height="2.4"/>
    <rect x="0" y="60" width="100" height="2.4"/>
  </g>

  <!-- circle ring -->
  <circle cx="50" cy="38" r="26.5" fill="#ffffff" stroke="{ORANGE}" stroke-width="2.6"/>

  <!-- red segmented arc (family element) -->
  <path d="M 32.5 25.5 A 21.5 21.5 0 0 1 67.5 25.5"
        fill="none" stroke="{RED}" stroke-width="5.4"
        stroke-dasharray="6.2 2.55"/>
'''

def wordmark(name):
    return f'''
  <!-- wordmark -->
  <text x="50" y="78.5" text-anchor="middle" font-family="Nunito, sans-serif"
        font-weight="900" font-size="14.5" fill="{WORD_ORANGE}">expert</text>
  <text x="50" y="90" text-anchor="middle" font-family="Nunito, sans-serif"
        font-weight="800" font-size="11" fill="{INK}">{name}</text>
  <text x="50" y="96.2" text-anchor="middle" font-family="Nunito, sans-serif"
        font-weight="800" font-size="4.6" letter-spacing="0.5">
    <tspan fill="{INK2}">for </tspan><tspan fill="{RED}">Redmine</tspan>
  </text>
'''

# --- per-plugin centre glyphs, all inside the circle ------------------------

GLYPHS = {
    # Reproduced from the existing agile logo, unchanged.
    'agile': f'''
  <!-- kanban board -->
  <g>
    <rect x="29" y="29" width="42" height="27" rx="3.4" fill="{ORANGE}"/>
    <rect x="32.4" y="32.4" width="10.4" height="20.2" rx="1.6" fill="#ffffff"/>
    <rect x="44.8" y="32.4" width="10.4" height="20.2" rx="1.6" fill="#ffffff"/>
    <rect x="57.2" y="32.4" width="10.4" height="20.2" rx="1.6" fill="#ffffff"/>
    <rect x="33.8" y="34.0" width="7.6" height="4.6" rx="1.1" fill="{RED}"/>
    <rect x="33.8" y="39.8" width="7.6" height="4.6" rx="1.1" fill="{SALMON}"/>
    <rect x="33.8" y="45.6" width="7.6" height="4.6" rx="1.1" fill="{SALMON}"/>
    <rect x="46.2" y="34.0" width="7.6" height="4.6" rx="1.1" fill="{RED}"/>
    <rect x="46.2" y="39.8" width="7.6" height="4.6" rx="1.1" fill="{SALMON}"/>
    <rect x="58.6" y="34.0" width="7.6" height="4.6" rx="1.1" fill="{RED}"/>
    <g stroke="#ffffff" stroke-width="1.5" stroke-linecap="round">
      <line x1="60.9" y1="35.1" x2="64.0" y2="38.2"/>
      <line x1="64.0" y1="35.1" x2="60.9" y2="38.2"/>
    </g>
  </g>
''',

    # Envelope: mail in, ticket out.
    'helpdesk': f'''
  <!-- envelope -->
  <g>
    <rect x="29" y="29" width="42" height="27" rx="3.4" fill="{ORANGE}"/>
    <path d="M 32.6 33.2 L 50 44.6 L 67.4 33.2"
          fill="none" stroke="#ffffff" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round"/>
    <!-- ticket stub along the bottom edge -->
    <rect x="32.6" y="48.6" width="34.8" height="4.2" rx="2.1" fill="{RED}"/>
    <g stroke="{ORANGE}" stroke-width="1.2" stroke-linecap="round">
      <line x1="44.0" y1="48.6" x2="44.0" y2="52.8"/>
      <line x1="56.0" y1="48.6" x2="56.0" y2="52.8"/>
    </g>
  </g>
''',

    # Gauge: "can I take this instance down right now?"
    'metrics': f'''
  <!-- gauge -->
  <g>
    <path d="M 32.5 49.5 A 17.5 17.5 0 0 1 67.5 49.5"
          fill="none" stroke="{ORANGE}" stroke-width="5.2" stroke-linecap="round"/>
    <g stroke="{SALMON}" stroke-width="2" stroke-linecap="round">
      <line x1="36.4" y1="38.4" x2="38.9" y2="40.1"/>
      <line x1="50.0" y1="33.6" x2="50.0" y2="36.6"/>
      <line x1="63.6" y1="38.4" x2="61.1" y2="40.1"/>
    </g>
    <line x1="50" y1="49.5" x2="60.4" y2="39.9"
          stroke="{RED}" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="50" cy="49.5" r="3.6" fill="{RED}"/>
    <circle cx="50" cy="49.5" r="1.4" fill="#ffffff"/>
  </g>
''',

    # Framed picture, opening larger.
    'lightbox': f'''
  <!-- framed picture -->
  <g>
    <rect x="29" y="29" width="42" height="27" rx="3.4" fill="{ORANGE}"/>
    <rect x="33.2" y="33.2" width="33.6" height="18.6" rx="2.2" fill="#ffffff"/>
    <circle cx="40.4" cy="39.0" r="2.7" fill="{RED}"/>
    <path d="M 33.2 51.8 L 42.6 42.8 L 49.4 49.6 L 55.4 43.6 L 66.8 51.8 Z" fill="{SALMON}"/>
    <path d="M 49.4 49.6 L 55.4 43.6 L 66.8 51.8 Z" fill="{RED}"/>
    <!-- expand bracket: must NOT be white, it sits on the white inner rect -->
    <g stroke="{RED}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M 61.6 36.4 L 64.8 36.4 L 64.8 39.6"/>
    </g>
  </g>
''',
}

NAMES = {'helpdesk': 'Helpdesk', 'agile': 'Agile', 'metrics': 'Metrics', 'lightbox': 'Lightbox'}

root = pathlib.Path(__file__).resolve().parents[2]
site_logo_dir = root / 'assets' / 'img' / 'logo'
out_dir = pathlib.Path(__file__).parent / 'out'
site_logo_dir.mkdir(parents=True, exist_ok=True)
out_dir.mkdir(parents=True, exist_ok=True)

for pid, glyph in GLYPHS.items():
    # Full logo, with wordmark — for redmine.org and the READMEs.
    full = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">\n'
            f'  <!-- expert {NAMES[pid]} - redmine.org plugin directory logo -->\n'
            + frame(0, 0, 100, 100) + glyph + wordmark(NAMES[pid]) + '</svg>\n')
    (out_dir / f'{pid}-logo.svg').write_text(full)

    # Square mark for the website: no white ground, no star watermark.
    # The mark sits on a warm gradient, on cards, and on a dark ground in dark
    # mode. A white rect reads as a sticker on all three, and the striped star
    # needs a known background colour to knock its stripes out against. So the
    # mark keeps only the ring, the arc and the glyph, on transparency.
    mark = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="20 8 60 60" width="60" height="60">\n'
            f'  <!-- expert {NAMES[pid]} - square mark, no wordmark (website) -->\n'
            + ring() + glyph + '</svg>\n')
    (site_logo_dir / f'{pid}.svg').write_text(mark)
    print(f'  {pid}: logo.svg + mark')

# PNG exports for the directory listing, matching what the agile repo ships.
# Rasterised through Chromium, NOT ImageMagick: IM's SVG delegate (rsvg-convert)
# is not installed here, and its fallback renderer ignores the 5% group opacity
# on the star watermark and overlaps the "for Redmine" tspans.
raster = pathlib.Path(__file__).parents[1] / 'capture' / 'rasterise.mjs'
for pid in GLYPHS:
    src = out_dir / f'{pid}-logo.svg'
    for size in (500, 100):
        dst = out_dir / f'{pid}-logo-{size}.png'
        subprocess.run(['node', str(raster), str(src), str(dst), str(size)], check=True)
print(f'\nsite marks -> {site_logo_dir}')
print(f'repo logos -> {out_dir}')
