// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Cart review and access guards', () => {
  test('Empty Cart Cannot Proceed to Checkout', async ({ page }) => {
    // 1. Sign in and open the cart without adding a product.
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(0);

    // 2. An empty cart must not enter a completable checkout.
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
  });
});
