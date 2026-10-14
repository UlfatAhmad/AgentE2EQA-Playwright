// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts
const { test, expect } = require('@playwright/test');

test.describe('Checkout information and overview', () => {
  test('Checkout Accepts Non-Empty Special-Character Information', async ({ page }) => {
    // 1. Sign in and add a product.
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // 2. Enter non-empty values containing special characters.
    await page.locator('[data-test="firstName"]').fill('A!@#');
    await page.locator('[data-test="lastName"]').fill("O'Neil-42");
    await page.locator('[data-test="postalCode"]').fill('not-a-postal-code');

    await page.locator('[data-test="continue"]').click();

    // 3. Verify that SauceDemo advances to the overview page.
    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
  });
});