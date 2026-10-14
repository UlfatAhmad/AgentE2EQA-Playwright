// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Checkout information and overview', () => {
  test('Checkout Information Requires Each Mandatory Field', async ({ page }) => {
    // 1. Sign in, add Sauce Labs Backpack, and open Checkout Your Information.
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Zip/Postal Code' })).toBeVisible();

    // 2. Leave all fields empty and verify the First Name validation message.
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByRole('alert')).toContainText('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html$/);

    // 3. Fill First Name only and verify the Last Name validation message.
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByRole('alert')).toContainText('Last Name is required');

    // 4. Fill Last Name but leave Zip/Postal Code empty and verify its validation message.
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByRole('alert')).toContainText('Postal Code is required');
  });
});
