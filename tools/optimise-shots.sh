#!/usr/bin/env bash
# Build the site's screenshot assets from a plugin repo's docs/screenshots/.
#
#   tools/optimise-shots.sh <plugin-id> <path-to-plugin-repo>
#
# The raw captures are 2880-3430px wide PNGs (11 MB across the two plugins that
# have them), which is far too heavy to ship. Each one becomes two WebP files:
#
#   <name>.webp      1440px wide  — what the page actually renders
#   <name>@2x.webp   2400px wide  — srcset, and the zoom dialog's source
#
# Images narrower than the target are NOT upscaled; `>` in the geometry keeps
# ImageMagick from inventing pixels.
set -euo pipefail

PLUGIN="${1:?usage: optimise-shots.sh <plugin-id> <plugin-repo-path>}"
REPO="${2:?usage: optimise-shots.sh <plugin-id> <plugin-repo-path>}"
SITE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

total_before=0
total_after=0

for lang in en de; do
  src="$REPO/docs/screenshots/$lang"
  [ -d "$src" ] || { echo "  skip $PLUGIN/$lang (no $src)"; continue; }

  dst="$SITE/assets/img/shots/$PLUGIN/$lang"
  mkdir -p "$dst"

  for png in "$src"/*.png; do
    [ -e "$png" ] || continue
    name="$(basename "$png" .png)"

    convert "$png" -strip -resize '1440x>' -quality 80 -define webp:method=6 \
            "$dst/$name.webp"
    convert "$png" -strip -resize '2400x>' -quality 74 -define webp:method=6 \
            "$dst/$name@2x.webp"

    before=$(stat -c%s "$png")
    after=$(( $(stat -c%s "$dst/$name.webp") + $(stat -c%s "$dst/$name@2x.webp") ))
    total_before=$(( total_before + before ))
    total_after=$(( total_after + after ))
  done
  echo "  $PLUGIN/$lang: $(ls -1 "$dst"/*.webp 2>/dev/null | wc -l) files"
done

if [ "$total_before" -gt 0 ]; then
  printf '  %s: %s KB -> %s KB\n' "$PLUGIN" \
    "$(( total_before / 1024 ))" "$(( total_after / 1024 ))"
fi

python3 "$SITE/tools/index-shots.py"
