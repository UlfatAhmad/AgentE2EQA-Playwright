// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Checkout information and overview', () => {
  test('Invalid Checkout Information Is Rejected', async ({ page }) => {
    // 1. Sign in, add a product, and open Checkout Your Information.
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // 2. Submit special-character names and malformed postal data.
    await page.locator('[data-test="firstName"]').fill('A!@#');
    await page.locator('[data-test="lastName"]').fill("O'Neil-42");
    await page.locator('[data-test="postalCode"]').fill('not-a-postal-code');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByRole('alert')).toBeVisible();
  });
});
