# SCRUM-101 SauceDemo Checkout Test Plan

## Application Overview

Validate the SCRUM-101 checkout story on https://www.saucedemo.com using a fresh session and the documented standard_user / secret_sauce account. Cover cart contents and totals, required checkout information, invalid data handling, overview totals and navigation, order completion and cart clearing, empty-cart and authentication guards, browser back behavior, and a mobile viewport. A direct exploratory pass confirmed the login and inventory routes are reachable; detailed UI assertions must be verified during execution.

## Test Scenarios

### 1. Cart review and access guards

**Seed:** `tests/seed.spec.ts`

#### 1.1. Cart Review Displays Added Items and Totals

**File:** `tests/saucedemo-checkout/cart-review-displays-items-and-totals.spec.js`

**Steps:**
  1. Sign in with standard_user / secret_sauce and add Sauce Labs Backpack ($29.99) and Sauce Labs Bike Light ($9.99) to the cart.
    - expect: Both Add to cart controls become Remove controls and the cart badge shows 2.
  2. Open the cart.
    - expect: The cart shows both selected products with names, descriptions, prices, and quantity 1.
    - expect: Continue Shopping and Checkout controls are available.
  3. Compare the visible prices and quantities to the selected inventory items.
    - expect: Cart subtotal is consistent with $39.98 across the two products.

#### 1.2. Empty Cart Cannot Proceed to Checkout

**File:** `tests/saucedemo-checkout/empty-cart-checkout-guard.spec.js`

**Steps:**
  1. Sign in and open the cart without adding a product.
    - expect: The cart has no line items and no item count badge.
  2. Attempt to proceed to checkout if a Checkout control is displayed.
    - expect: The application prevents an empty order from reaching a completable checkout, consistent with business rule 3. Record any route that permits it as a defect.

#### 1.3. Checkout Requires an Authenticated User

**File:** `tests/saucedemo-checkout/checkout-requires-login.spec.js`

**Steps:**
  1. In a fresh signed-out browser context, navigate directly to the cart and checkout routes.
    - expect: Protected checkout routes redirect to sign-in or otherwise prevent access to checkout data and order completion.

### 2. Checkout information and overview

**Seed:** `tests/seed.spec.ts`

#### 2.1. Checkout Information Requires Each Mandatory Field

**File:** `tests/saucedemo-checkout/checkout-required-fields.spec.js`

**Steps:**
  1. Sign in, add Sauce Labs Backpack, open Cart, and select Checkout.
    - expect: Checkout Your Information displays First Name, Last Name, and Zip/Postal Code fields.
  2. Leave all fields empty and select Continue.
    - expect: An error identifies First Name as required and the user stays on the information page.
  3. Fill First Name only and select Continue.
    - expect: An error identifies Last Name as required and the user stays on the information page.
  4. Fill Last Name while leaving Zip/Postal Code empty and select Continue.
    - expect: An error identifies Zip/Postal Code as required and the user stays on the information page.

#### 2.2. Invalid Checkout Information Is Rejected

**File:** `tests/saucedemo-checkout/checkout-invalid-information.spec.js`

**Steps:**
  1. Sign in, add a product, reach Checkout Your Information, and submit nonempty values containing special characters and malformed/incomplete postal data.
    - expect: Invalid values produce clear validation feedback and do not advance to the overview, as specified by AC5. Record values accepted without validation as defects.

#### 2.3. Overview Shows Order Details and Cancel Returns to Cart

**File:** `tests/saucedemo-checkout/order-overview-and-cancel.spec.js`

**Steps:**
  1. Sign in, add Sauce Labs Backpack and Sauce Labs Bike Light, enter valid first name, last name, and postal code, then select Continue.
    - expect: The overview lists both items and shows payment and shipping information.
  2. Verify subtotal, tax, and total.
    - expect: Subtotal matches $39.98, tax is shown, and total equals subtotal plus tax.
  3. Select Cancel.
    - expect: Checkout is cancelled and the user returns to the cart without completing the order.

### 3. Order completion and navigation

**Seed:** `tests/seed.spec.ts`

#### 3.1. Finishing an Order Confirms Purchase and Clears Cart

**File:** `tests/saucedemo-checkout/order-completion-clears-cart.spec.js`

**Steps:**
  1. Sign in, add Sauce Labs Backpack, complete checkout information, and reach the order overview.
    - expect: The overview presents a Finish control and the order details.
  2. Select Finish.
    - expect: The confirmation page displays a success message and a Back Home control.
  3. Select Back Home and reopen the cart.
    - expect: The products page is shown and the cart is empty, as required by business rule 4.

#### 3.2. Cancel and Browser Back Preserve Expected Checkout Navigation

**File:** `tests/saucedemo-checkout/checkout-cancel-and-browser-back.spec.js`

**Steps:**
  1. Sign in, add one product, open checkout information, then use browser Back.
    - expect: The user can return to the cart and cart contents remain unchanged.
  2. Re-enter checkout information, submit valid data, then use browser Back from the overview.
    - expect: The user returns to an earlier checkout/cart state without completing the order or losing the cart item.

### 4. Responsive checkout

**Seed:** `tests/seed.spec.ts`

#### 4.1. Checkout Remains Usable at a Mobile Viewport

**File:** `tests/saucedemo-checkout/mobile-checkout-layout.spec.js`

**Steps:**
  1. Set the browser viewport to a mobile size (390x844), sign in, add a product, and navigate through cart, checkout information, and overview.
    - expect: Checkout fields and buttons are visible and usable without horizontal overflow or obstructing layout.
