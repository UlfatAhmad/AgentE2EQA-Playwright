// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Order completion and navigation', () => {
  test('Cancel and Browser Back Preserve Cart and Checkout Navigation', async ({ page }) => {
    // 1. Sign in and add a product.
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // 2. Start checkout and cancel.
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);

    await page.locator('[data-test="cancel"]').click();

    // SauceDemo returns to the inventory page.
   await expect(page).toHaveURL(/cart\.html$/);

    // 3. Verify the product remains in the cart.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // 4. Start checkout again and test browser Back.
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);

    await page.goBack();
    await expect(page).toHaveURL(/cart\.html$/);
  });
});