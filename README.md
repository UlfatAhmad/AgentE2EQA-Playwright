# Agentic AI-Powered E2E QA Automation Framework

[![Playwright Tests](https://github.com/UlfatAhmad/AgentE2EQA-Playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/UlfatAhmad/AgentE2EQA-Playwright/actions/workflows/playwright.yml)


An AI-assisted end-to-end testing portfolio project demonstrating a workflow from a user story to a test plan, exploratory browser testing, Playwright automation, and a recorded test report. The implemented example tests the e-commerce checkout flow on SauceDemo.

## 1. Project Overview

The agents and MCP tools support AI-assisted test planning, generation, execution, and debugging workflows. The latest verified local regression run completed successfully with **36 passed and 0 failed**, and the Playwright GitHub Actions workflow also completed successfully. Earlier acceptance-criteria discrepancies are preserved in the QA documentation, while the current automated tests validate observed SauceDemo behavior.

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

The checkout test suite validates the application's observed behavior across positive, negative, and navigation scenarios. Earlier testing identified differences between the proposed acceptance criteria and actual SauceDemo behavior; these findings are preserved in the QA documentation. The latest automated regression run completed with **36 passed and 0 failed** across Chromium, Firefox, and WebKit. Passing tests confirm the implemented assertions, but do not imply that every original acceptance criterion has been met.

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
├── docs/
│   ├── screenshots/
│   │   ├── SCRUM-101-cart-review.png
│   │   ├── SCRUM-101-empty-cart-checkout.png
│   │   ├── SCRUM-101-invalid-checkout-accepted.png
│   │   ├── SCRUM-101-order-confirmation.png
│   │   ├── SCRUM-101-order-overview.png
│   │   └── SCRUM-101-required-field-error.png
│   └── SCRUM-101-checkout-test-report.md
├── specs/
│   ├── README.md
│   └── saucedemo-checkout-test-plan.md
├── tests/
│   ├── saucedemo-checkout/      # Nine checkout scenarios (.spec.js)
│   ├── example.spec.ts          # Playwright documentation example
│   └── seed.spec.ts             # Generator seed scaffold
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md

The docs/ directory contains the preserved SCRUM-101 QA evidence, including screenshots and the test report.

Temporary Playwright and MCP artifacts are excluded from Git tracking through .gitignore. Generated HTML reports are stored locally in playwright-report/ and are available as downloadable artifacts from successful GitHub Actions workflow runs.

Local MCP configuration files are intentionally excluded from the public repository to avoid exposing credentials or machine-specific settings.

## 8. Getting Started

### Prerequisites

- Node.js LTS and npm
- Git
- Playwright-supported browsers

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/UlfatAhmad/AgentE2EQA-Playwright.git
cd AgentE2EQA-Playwright
npm ci
npx playwright install
```

On Linux, install Playwright browsers and their system dependencies using:

```bash
npx playwright install --with-deps
```

### Run Tests

Run all Playwright tests:

```bash
npx playwright test
```

Run only the SauceDemo checkout suite:

```bash
npx playwright test tests/saucedemo-checkout
```

Run tests in Chromium only:

```bash
npx playwright test --project=chromium
```

### View Test Reports

After executing the tests, open the HTML report:

```bash
npx playwright show-report
```

### Continuous Integration

The GitHub Actions workflow automatically executes Playwright tests on configured repository events.

View the latest CI results and download the HTML test report from the [GitHub Actions page](https://github.com/UlfatAhmad/AgentE2EQA-Playwright/actions).


## 9. Test Results and Reporting

The Playwright regression suite has been successfully executed locally and through GitHub Actions CI/CD.

**Latest verified results:**
- **36 of 36 test executions passed locally**
- **0 failures**
- **100% local pass rate**
- **Execution time: 37.2 seconds**
- **GitHub Actions Playwright workflow #4: Success**
- **CI workflow duration: 1 minute 57 seconds**

The suite runs across Chromium, Firefox, and WebKit.

The project also includes test documentation, checkout screenshots, and a recorded QA report. Earlier acceptance-criteria discrepancies were investigated and documented. The current regression tests verify observed SauceDemo behavior; passing regression tests do not establish that every original proposed acceptance criterion is satisfied.

The successful GitHub Actions run includes a downloadable Playwright HTML report artifact.

## 10. CI/CD — GitHub Actions

This project integrates GitHub Actions for automated continuous integration and cross-browser regression testing.

The Playwright workflow (`.github/workflows/playwright.yml`) automatically:

1. Checks out the repository.
2. Sets up Node.js and installs project dependencies.
3. Installs Playwright browsers and required dependencies.
4. Executes automated Playwright tests across Chromium, Firefox, and WebKit.
5. Generates and uploads an HTML test report as a downloadable workflow artifact.

### Verified CI Results

- **Workflow:** Playwright Tests
- **GitHub Actions Run:** #4
- **Status:** Success
- **Duration:** 1 minute 57 seconds
- **Branch:** `main`

The latest verified local regression run completed with **36 passed and 0 failed**.

[View GitHub Actions CI/CD Results](https://github.com/UlfatAhmad/AgentE2EQA-Playwright/actions)

The separate Copilot setup workflow is included in the repository but requires further configuration and validation.

## 11. Future Enhancements

- Expand automated test coverage to additional e-commerce user journeys and edge cases.
- Introduce the Page Object Model (POM) to improve test maintainability and reusability.
- Implement reusable Playwright fixtures and test data management.
- Add a dedicated mobile-device testing project.
- Integrate API testing with Playwright for end-to-end UI and API validation.
- Enhance AI-assisted test generation, debugging, and maintenance using GitHub Copilot and MCP.
- Add structured test reporting and historical execution trends.
- Review documented acceptance-criteria discrepancies with the product owner.
- Further optimize GitHub Actions CI/CD execution and reporting.

## 12. Author

**Ulfat Ahmad** — [@UlfatAhmad on GitHub](https://github.com/UlfatAhmad)
