# Agentic AI-Powered E2E QA Automation Framework
[![Playwright Tests](https://github.com/UlfatAhmad/AgentE2EQA-Playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/UlfatAhmad/AgentE2EQA-Playwright/actions/workflows/playwright.yml)
An AI-assisted end-to-end testing portfolio project demonstrating a workflow from a user story to a test plan, exploratory browser testing, Playwright automation, and a recorded test report. The implemented example tests the e-commerce checkout flow on SauceDemo.

## 1. Project Overview

This project combines Playwright browser automation with purpose-built agent instructions and Model Context Protocol (MCP) server configuration. Its checkout example covers cart review, checkout form validation, order overview, order completion, authentication, navigation, and a mobile-sized viewport.

The agents and MCP tools support test planning and generation workflows. Automation results are reported as observed: the current recorded checkout run includes failing acceptance-criteria checks and is not a fully passing suite.

## 2. Technology Stack

Technologies present in the project:

- **Node.js and npm** — JavaScript runtime and package installation.
- **Playwright Test** (`@playwright/test`) — browser automation, assertions, projects, and HTML reporting.
- **JavaScript and TypeScript** — checkout scenarios are JavaScript; the Playwright configuration and starter/example specs are TypeScript.
- **GitHub Actions** — configured workflows for Playwright tests and Copilot setup.
- **MCP** — local Playwright and authenticated GitHub server definitions for AI-assisted workflows.

The project does not currently declare a TypeScript compiler, application framework, or application build script.

## 3. Agentic AI QA Architecture

Three custom agents are defined under `.github/agents/`:

| Agent | Defined responsibility |
|---|---|
| `playwright-test-planner` | Explore a web application and save a structured test plan covering user journeys, positive and negative cases, and edge cases. |
| `playwright-test-generator` | Execute plan steps through browser tools, use the interaction log, and write Playwright tests with assertions and step comments. |
| `playwright-test-healer` | Run tests, debug failures, investigate page state and selectors, and update tests when failures are due to automation issues. |

The SCRUM-101 workflow prompt in `.github/user-stories/QAEnd2EndPromptFile.md` describes a seven-step progression from story review through reporting and repository delivery. Agents are instructions for an AI host; their availability and configured model support depend on that host. Agent definitions do not themselves implement checkout application behavior.

## 4. Test Automation Framework

`playwright.config.ts` sets `tests/` as the test directory and defines three browser projects:

- **Chromium** using Playwright's Desktop Chrome device profile.
- **Firefox** using the Desktop Firefox profile.
- **WebKit** using the Desktop Safari profile (WebKit engine; not branded Safari).

The configuration enables parallel execution, HTML reporting, traces on the first retry, and CI-specific retries and worker settings. The checkout scenarios use Playwright locators, role-based assertions, and isolated browser pages. The mobile scenario sets a 390 × 844 viewport within the WebKit/desktop project rather than using a separate mobile-device project.

Checkout scenarios are currently JavaScript `.spec.js` files. TypeScript is present in `playwright.config.ts`, `tests/example.spec.ts`, and `tests/seed.spec.ts`; there are no TypeScript checkout scenarios.

## 5. Test Scenarios

The checkout suite is under `tests/saucedemo-checkout/` and follows the SCRUM-101 story and plan:

- Cart items, quantities, prices, and cart total.
- Empty-cart checkout protection and signed-out route access.
- Required first name, last name, and postal-code validation.
- Rejection of malformed checkout information.
- Order overview, payment and shipping details, subtotal, tax, and total.
- Cancel and browser Back navigation.
- Order confirmation and cart clearing.
- Checkout usability at a mobile-sized viewport.

Several scenarios intentionally assert acceptance criteria that the current application does not satisfy. Their failures are documented below and are not suppressed to produce a passing result.

## 6. MCP Integration

The local MCP definitions provide:

- **Playwright MCP** — browser interaction and test planning/generation/debugging tools. The configuration defines both the Playwright browser server and the Playwright Test MCP server.
- **GitHub MCP** — an authenticated HTTP server definition for GitHub-related operations.

MCP configuration is local workspace setup and is not included in the public repository. Configure MCP credentials through your editor/host's secret-input mechanism; do not commit access tokens or authorization headers. The checked-in agent files also declare their Playwright MCP server requirements.

## 7. Project Structure

```text
.
├── .github/
│   ├── agents/
│   │   ├── playwright-test-generator.agent.md
│   │   ├── playwright-test-healer.agent.md
│   │   └── playwright-test-planner.agent.md
│   ├── user-stories/
│   │   ├── QAEnd2EndPromptFile.md
│   │   └── SCRUM-101-commerce-checkout.md
│   └── workflows/
│       ├── copilot-setup-steps.yml
│       └── playwright.yml
├── .playwright-mcp/             # Saved SCRUM-101 screenshot evidence
├── specs/
│   ├── README.md
│   └── saucedemo-checkout-test-plan.md
├── test-results/
│   └── SCRUM-101-checkout-test-report.md
├── tests/
│   ├── saucedemo-checkout/      # Nine checkout scenarios (.spec.js)
│   ├── example.spec.ts          # Playwright documentation example
│   └── seed.spec.ts             # Empty generator seed scaffold
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

Playwright-generated HTML output is written to `playwright-report/` when produced; it is ignored by Git. MCP configuration files are intentionally omitted from this tree because they are local and untracked.

## 8. Getting Started

### Prerequisites

- Node.js LTS and npm.
- Git.
- Playwright browser binaries for the projects you intend to run.

### Install

```bash
git clone https://github.com/UlfatAhmad/AgentE2EQA-Playwright.git
cd AgentE2EQA-Playwright
npm ci
npx playwright install
```

On Linux CI environments, install browser system dependencies with:

```bash
npx playwright install --with-deps
```

### Run the checkout suite

Run one browser project:

```bash
npx playwright test tests/saucedemo-checkout --project=chromium
```

Run the checkout scenarios in all configured browser projects:

```bash
npx playwright test tests/saucedemo-checkout --project=chromium --project=firefox --project=webkit
```

Run every Playwright test discovered under `tests/`, as the test workflow does:

```bash
npx playwright test
```

There are no npm test scripts defined in `package.json`. To open a generated HTML report:

```bash
npx playwright show-report
```

## 9. Test Results and Reporting

The repository includes a recorded SCRUM-101 report at [`test-results/SCRUM-101-checkout-test-report.md`](test-results/SCRUM-101-checkout-test-report.md), along with test-plan documentation and screenshots in `.playwright-mcp/`.

In the documented cross-browser run, the nine checkout scenarios ran in Chromium, Firefox, and WebKit: **15 of 27 executions passed and 12 failed**. The failures repeat across all three projects and correspond to four checkout behavior gaps:

1. The cart page does not show a combined total.
2. An empty cart can proceed to an overview with a zero total and Finish action.
3. Malformed nonempty checkout values are accepted.
4. Cancel from the order overview returns to Products instead of the cart.

The normal order-completion path, required-field errors, authentication redirects, tested browser Back behavior, and the tested mobile-sized layout passed. The complete manual findings, defect details, coverage, and screenshots are in the report. This is a recorded test run, not a claim that the current GitHub Actions workflow has passed.

## 10. CI/CD

`.github/workflows/playwright.yml` runs on pushes and pull requests targeting `main` or `master`. It checks out the repository, installs Node.js LTS and npm dependencies, installs Playwright browsers, runs `npx playwright test`, and uploads the Playwright HTML report as an artifact.

`.github/workflows/copilot-setup-steps.yml` installs dependencies and browsers for its configured triggers, then attempts `npx run build`. The repository has no application build script or application code, so this step should be reviewed before relying on that workflow. CI results should be checked in GitHub Actions; no passing CI run is asserted here.

## 11. Future Enhancements

- Resolve the four documented checkout behavior gaps, then rerun the acceptance suite.
- Add a dedicated mobile-device browser project and expand responsive viewport coverage.
- Add npm scripts for common test, browser-install, and report commands.
- Correct or remove the Copilot setup workflow's build step until a build target exists.
- Add structured test-result output and publish reports consistently from local and CI runs.
- Move repeated sign-in and cart setup into well-scoped fixtures or shared helpers.
- Review the agent model configuration against the models available in the target Copilot host.

## 12. Author

**Ulfat Ahmad** — [@UlfatAhmad on GitHub](https://github.com/UlfatAhmad)
