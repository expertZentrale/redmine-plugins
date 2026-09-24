#!/usr/bin/env bash
# Runs prep/<plugin>.rb inside the screenshots stack's seed container.
#   tools/capture/prep/run.sh helpdesk
# REDMINE_EXPERT points at the redmine-expert checkout (default: ../redmine-expert
# next to this repo). Never the dev stack: docker-compose.screenshots.yml only.
set -euo pipefail
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
stack="${REDMINE_EXPERT:-$here/../../../../redmine-expert}"
cd "$stack"
docker compose -f docker-compose.screenshots.yml --profile seed run --rm \
  -v "$here:/prep:ro" -e DEMO_STACK=1 redmine-seed \
  rails runner "/prep/${1:?usage: run.sh <plugin>}.rb" 2>&1 | tee /dev/stderr | grep -E '^VAR ' \
  | awk 'BEGIN{printf "{"} {printf "%s\"%s\": \"%s\"", (NR>1?", ":""), $2, $3} END{print "}"}' \
  > "$here/$1.vars.json"
cat "$here/$1.vars.json"
