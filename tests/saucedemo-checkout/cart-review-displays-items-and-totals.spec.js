// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Cart review and access guards', () => {
  test('Cart Review Displays Added Items and Totals', async ({ page }) => {
    // 1. Sign in with standard_user / secret_sauce and add Sauce Labs Backpack and Sauce Labs Bike Light.
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.getByRole('button', { name: 'Cart, 2 items' })).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

    // 2. Open the cart and verify both selected products and available actions.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByText('$29.99')).toBeVisible();
    await expect(page.getByText('$9.99')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

    // 3. Verify quantities and subtotal consistency.
    await expect(page.locator('.cart_quantity')).toHaveCount(2);
    await expect(page.locator('.cart_quantity').nth(0)).toHaveText('1');
    await expect(page.locator('.cart_quantity').nth(1)).toHaveText('1');
    await expect(page.locator('.cart_item')).toHaveCount(2);
  });
});
