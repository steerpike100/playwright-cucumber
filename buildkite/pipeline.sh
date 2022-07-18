#!/bin/bash

set -euo pipefail

PIPELINE=${PIPELINE:-build}

function build(){
  cat <<EOF
steps:
 - name: ":destop_computer: Automation"
   command: "./scripts/buildkite-automation.sh"
EOF
}

$PIPELINE