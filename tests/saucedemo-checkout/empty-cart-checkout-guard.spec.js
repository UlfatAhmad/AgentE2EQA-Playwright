// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Cart review and access guards', () => {
  test('Empty Cart Can Navigate to Checkout Information', async ({ page }) => {
    // 1. Sign in without adding any products.
    await page.goto('https://www.saucedemo.com');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 2. Open the empty shopping cart.
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.locator('.cart_item')).toHaveCount(0);

    // 3. Click Checkout.
    await page.locator('[data-test="checkout"]').click();

    // 4. Verify the actual SauceDemo behavior.
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
  });
});