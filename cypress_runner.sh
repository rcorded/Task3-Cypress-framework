#!/usr/bin/env bash

set -euo pipefail

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${YELLOW}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1" >&2; }

show_help() {
    cat << EOF
Usage: $(basename "$0") <command> [arguments]

A wrapper script to manage and execute Cypress E2E tests from the project root.

Commands:
  install                     Install npm dependencies
  open                        Open the Cypress Test Runner (Interactive UI)
  run                         Run all tests in default headless mode
  headed                      Run all tests in headed mode
  browser <name>              Run all tests in a specific browser (e.g., chrome, firefox, edge)
  spec <path> [browser]       Run a specific test file (optionally in a specific browser)
  report                      Run tests and generate an HTML report using Mochawesome
  help                        Show this help message

Examples:
  $(basename "$0") browser firefox
  $(basename "$0") spec cypress/e2e/login.spec.ts
  $(basename "$0") spec cypress/e2e/login.spec.ts chrome
EOF
}

ensure_in_project_root() {
    if [[ ! -f "package.json" ]] || [[ ! -d "cypress" ]]; then
        log_error "This script must be run from the root of the Cypress project."
        log_info "Make sure you are in the directory containing 'package.json' and the 'cypress/' folder."
        exit 1
    fi
}


if [[ $# -eq 0 ]]; then
    show_help
    exit 1
fi

COMMAND=$1

case "$COMMAND" in
    install)
        ensure_in_project_root
        log_info "Installing npm dependencies in the current directory..."
        npm install
        log_success "Installation completed successfully."
        ;;
    open)
        ensure_in_project_root
        log_info "Opening Cypress Test Runner..."
        npx cypress open
        ;;
    run)
        ensure_in_project_root
        log_info "Running all tests in default headless mode..."
        npx cypress run
        ;;
    headed)
        ensure_in_project_root
        log_info "Running tests in headed mode..."
        npx cypress run --headed
        ;;
    browser)
        ensure_in_project_root
        BROWSER_NAME=${2:-}
        if [[ -z "$BROWSER_NAME" ]]; then
            log_error "Please specify a browser. Options: chrome, firefox, edge, electron."
            log_info "Usage: $(basename "$0") browser <name>"
            exit 1
        fi
        log_info "Running tests in $BROWSER_NAME..."
        npx cypress run --browser "$BROWSER_NAME"
        ;;
    spec)
        ensure_in_project_root
        SPEC_PATH=${2:-}
        BROWSER_NAME=${3:-}
        
        if [[ -z "$SPEC_PATH" ]]; then
            log_error "Please specify a path to the spec file."
            log_info "Usage: $(basename "$0") spec <path/to/file.spec.ts> [browser]"
            exit 1
        fi
        
        if [[ -n "$BROWSER_NAME" ]]; then
            log_info "Running specific spec file: $SPEC_PATH in $BROWSER_NAME..."
            npx cypress run --spec "$SPEC_PATH" --browser "$BROWSER_NAME"
        else
            log_info "Running specific spec file: $SPEC_PATH in default browser..."
            npx cypress run --spec "$SPEC_PATH"
        fi
        ;;
    report)
        ensure_in_project_root
        log_info "Running tests and generating Mochawesome HTML report..."
        
        set +e
        npx cypress run --reporter cypress-mochawesome-reporter
        TEST_EXIT_CODE=$?
        set -e
        
        if [[ $TEST_EXIT_CODE -eq 0 ]]; then
            log_success "All tests passed successfully."
        else
            log_error "Some tests failed. Please review the generated report."
        fi
        
        log_info "Report location: $(pwd)/cypress/reports/html/index.html"
        exit "$TEST_EXIT_CODE"
        ;;
    help)
        show_help
        ;;
    *)
        log_error "Unknown command: $COMMAND"
        show_help
        exit 1
        ;;
esac