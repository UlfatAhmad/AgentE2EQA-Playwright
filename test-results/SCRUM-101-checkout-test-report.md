# SCRUM-101 Checkout Test Report

## Executive Summary

- **Application:** [SauceDemo](https://www.saucedemo.com)
- **Planned scenarios:** 9
- **Manual scenarios executed:** 9
- **Automated scenarios:** 9, run in Chromium, Firefox, and WebKit
- **Automated executions:** 27 total — 15 passed, 12 failed
- **Distinct failed scenarios:** 4, each failing consistently in all three browsers
- **Overall status:** **FAIL** — the primary purchase path works, but cart total display, empty-cart protection, invalid-data validation, and overview cancellation do not meet the story.

The planner and healer custom agents could not start because their configured model (`Claude Sonnet 4.6`) is unavailable in this environment. The available planner and generator MCP tools were used, and test failures were examined with the Playwright test debugger. The failed assertions represent observed application behavior that conflicts with SCRUM-101, not test selector or timing defects. They remain failures rather than being weakened or skipped.

## Manual Test Results

| Scenario | Result | Observations |
|---|---|---|
| Cart review | **FAIL** | Both products, descriptions, quantities, prices, and Continue Shopping/Checkout controls were present. The cart did not display the `$39.98` combined total required by AC1. |
| Empty-cart guard | **FAIL** | Checkout remained available with an empty cart. With valid checkout information, the site reached an overview displaying `$0.00` and a Finish button. Finish was not clicked. |
| Authentication guard | **PASS** | Direct navigation to `/cart.html` and `/checkout-step-one.html` while signed out redirected to the login page. |
| Required checkout fields | **PASS** | Empty submission prompted “First Name is required”; subsequent submissions identified “Last Name is required” and “Postal Code is required.” |
| Invalid checkout information | **FAIL** | Nonempty values `A!@#`, `O'Neil-42`, and `not-a-postal-code` were accepted and advanced to the overview without validation. |
| Order overview and cancel | **FAIL** | Item details, SauceCard payment text, shipping text, `$39.98` subtotal, `$3.20` tax, and `$43.18` total were correct. Cancel returned to `/inventory.html`, not the cart as specified by the business rule. |
| Order completion and cart clearing | **PASS** | Finish displayed “Thank you for your order!” and Back Home; after returning home the cart was empty. |
| Cancel and browser Back | **PASS** | Cancel from checkout information and browser Back preserved the cart item. Back from the overview returned to checkout information with the cart item still present. |
| Mobile checkout | **PASS** | Checkout remained usable at 390×844. The measured document width was 375 px against a 390 px viewport, with no horizontal overflow. |

## Screenshot Evidence

Saved screenshots are in the workspace’s `.playwright-mcp` evidence folder:

- [Cart review](../.playwright-mcp/SCRUM-101-cart-review.png)
- [Required-field error](../.playwright-mcp/SCRUM-101-required-field-error.png)
- [Malformed input accepted at overview](../.playwright-mcp/SCRUM-101-invalid-checkout-accepted.png)
- [Order overview and totals](../.playwright-mcp/SCRUM-101-order-overview.png)
- [Order confirmation](../.playwright-mcp/SCRUM-101-order-confirmation.png)
- [Empty-cart checkout overview](../.playwright-mcp/SCRUM-101-empty-cart-checkout.png)

## Automated Test Results

Nine test files were created under `tests/saucedemo-checkout/` and run against the configured Chromium, Firefox, and WebKit projects. The generator MCP was used to record and write the cart-review scenario; the remaining scenario files followed the resulting plan and the selectors observed during exploration.

| Project | Passed | Failed | Result |
|---|---:|---:|---|
| Chromium | 5 | 4 | **FAIL** |
| Firefox | 5 | 4 | **FAIL** |
| WebKit | 5 | 4 | **FAIL** |
| **Total** | **15** | **12** | **FAIL** |

Passing scenarios in each project: authentication guard, required fields, order completion/cart clearing, browser Back/cancel from checkout information, and mobile layout.

Failing scenarios in each project:

1. Cart Review Displays Added Items and Totals — expected cart total is absent.
2. Empty Cart Cannot Proceed to Checkout — empty cart enters checkout instead of remaining in cart.
3. Invalid Checkout Information Is Rejected — malformed values advance to the overview.
4. Overview Shows Order Details and Cancel Returns to Cart — Cancel returns to inventory.

The Playwright debugger reproduced the invalid-information failure and showed the overview page with the item and Finish control. No selector or timing remediation was indicated. The custom healer agent was unavailable, and no changes were made that would hide these acceptance-criteria failures.

## Defects Log

These are provisional report IDs only; no external defect tracker was configured or updated.

### SCRUM-101-D1 — Cart does not display the combined item total

- **Severity:** Medium
- **Area:** AC1, Cart Review
- **Description:** The cart lists product prices and quantities but has no displayed combined total.
- **Steps to reproduce:** Sign in, add the Backpack and Bike Light, and open the cart.
- **Expected:** The cart displays the combined total of `$39.98`.
- **Actual:** No cart total is displayed. The equivalent subtotal is visible later on the overview.
- **Evidence:** [Cart review screenshot](../.playwright-mcp/SCRUM-101-cart-review.png)
- **Environment:** SauceDemo, Chromium / Firefox / WebKit.

### SCRUM-101-D2 — Empty cart can reach a completable checkout

- **Severity:** High
- **Area:** Business rule 3
- **Description:** Checkout is available from an empty cart, and valid customer fields lead to an overview with `$0.00` total and a Finish button.
- **Steps to reproduce:** Sign in with an empty cart, choose Checkout, enter nonempty checkout information, and choose Continue.
- **Expected:** The application prevents an empty order from proceeding.
- **Actual:** The empty order reaches an overview where Finish is enabled. Finish was not selected.
- **Evidence:** [Empty-cart checkout screenshot](../.playwright-mcp/SCRUM-101-empty-cart-checkout.png)
- **Environment:** SauceDemo, Chromium / Firefox / WebKit.

### SCRUM-101-D3 — Invalid nonempty checkout information is accepted

- **Severity:** Medium
- **Area:** AC5
- **Description:** Special-character names and malformed postal data are accepted without feedback.
- **Steps to reproduce:** Add an item, open checkout, enter `A!@#`, `O'Neil-42`, and `not-a-postal-code`, then choose Continue.
- **Expected:** Validation feedback is shown and the user remains on the information page.
- **Actual:** The user advances to the order overview.
- **Evidence:** [Malformed input accepted at overview screenshot](../.playwright-mcp/SCRUM-101-invalid-checkout-accepted.png)
- **Environment:** SauceDemo, Chromium / Firefox / WebKit.

### SCRUM-101-D4 — Cancel from the order overview returns to Products, not Cart

- **Severity:** Medium
- **Area:** Business rule 5
- **Description:** Cancel from the overview navigates to the inventory page rather than the cart.
- **Steps to reproduce:** Add a product, complete checkout information, reach the overview, and choose Cancel.
- **Expected:** Checkout is cancelled and the user returns to the cart.
- **Actual:** The user returns to `/inventory.html`; the item remains in the cart.
- **Environment:** SauceDemo, Chromium / Firefox / WebKit.

## Test Coverage Analysis

| Requirement | Manual coverage | Automated coverage | Status |
|---|---|---|---|
| AC1 — Cart items, details, total, and actions | Items/details/actions verified; total missing | Covered by cart review scenario | **Partial / fail** |
| AC2 — Checkout fields and required-field errors | All three sequential required-field errors verified | Covered by required-fields scenario | **Pass** |
| AC3 — Overview items, payment/shipping, totals, cancel | Details and calculations pass; Cancel destination fails | Covered by overview/cancel scenario | **Partial / fail** |
| AC4 — Confirmation and Back Home | Success message, navigation, and cart clearing verified | Covered by order-completion scenario | **Pass** |
| AC5 — Reject invalid checkout data | Invalid data accepted | Covered by invalid-information scenario | **Fail** |
| Business rule 2 — Login required | Direct protected routes redirect to login | Covered by authentication scenario | **Pass** |
| Business rule 3 — Cart cannot be empty | Empty order reaches overview and Finish | Covered by empty-cart scenario | **Fail** |
| Business rule 4 — Confirmation clears cart | Cart empty after completion | Covered by order-completion scenario | **Pass** |
| Business rule 5 — Cancel returns to cart | Information-step Cancel passes; overview Cancel does not | Covered by navigation/overview scenarios | **Partial / fail** |
| Responsive checkout | Mobile-size layout and control positioning checked | Covered at 390×844 | **Pass at tested viewport** |

Browser coverage is complete for the configured desktop Chromium, Firefox, and WebKit projects. Mobile coverage was manually inspected and automated at a 390×844 viewport; device-specific emulation and additional viewport sizes remain untested.

## Summary and Recommendations

The main happy path—from cart through confirmation—works in all three tested browser projects. Required-field validation, authentication protection, browser Back behavior, cart clearing, and the tested mobile viewport also passed.

Prioritize the empty-cart guard, since the application allows a zero-value order to reach Finish. Then add validation for malformed checkout data, display the cart total, and align overview Cancel behavior with the story. Re-run the failing tests across all three browser projects after the application changes. No application source code was in this workspace, so product defects could not be fixed here.

## Workflow Limitations

- The planner and healer custom agents specify `Claude Sonnet 4.6`, which was unavailable. Planner MCP tools and the test debugger were used as fallbacks; the generator MCP flow recorded and wrote the cart-review test, while remaining scenarios were authored from the saved plan and observed selectors.
- The GitHub MCP tools available in this session do not provide repository commit or push operations, so local Git is being used for the requested repository delivery. MCP configuration files and exploratory trace/log files are excluded from the commit to avoid publishing credentials or transient data.
