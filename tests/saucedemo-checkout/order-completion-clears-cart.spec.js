// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Order completion and navigation', () => {
  test('Finishing an Order Confirms Purchase and Clears Cart', async ({ page }) => {
    // 1. Add Sauce Labs Backpack and complete valid checkout information.
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="finish"]')).toBeVisible();

    // 2. Finish the demo order and verify order confirmation.
    await page.locator('[data-test="finish"]').click();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();

    // 3. Return home and verify the cart was cleared.
    await page.locator('[data-test="back-to-products"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });
});
