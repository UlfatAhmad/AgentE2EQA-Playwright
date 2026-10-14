// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Order completion and navigation', () => {
  test('Cancel and Browser Back Preserve Expected Checkout Navigation', async ({ page }) => {
    // 1. Add a product, open checkout, cancel, then verify browser Back from checkout info.
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await page.locator('[data-test="checkout"]').click();
    await page.goBack();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // 2. Submit valid checkout information and use browser Back from the overview.
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await page.goBack();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
  });
});
