// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Responsive checkout', () => {
  test('Checkout Remains Usable at a Mobile Viewport', async ({ page }) => {
    // 1. Set a mobile viewport, sign in, add a product, and navigate through checkout.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // 2. Verify the form controls fit within the mobile viewport.
    const firstNameBox = await page.locator('[data-test="firstName"]').boundingBox();
    const continueBox = await page.locator('[data-test="continue"]').boundingBox();
    expect(firstNameBox).not.toBeNull();
    expect(continueBox).not.toBeNull();
    if (firstNameBox && continueBox) {
      expect(firstNameBox.x + firstNameBox.width).toBeLessThanOrEqual(390);
      expect(continueBox.x + continueBox.width).toBeLessThanOrEqual(390);
    }

    // 3. Complete checkout information and verify the overview remains usable.
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByRole('button', { name: 'Finish' })).toBeVisible();
    const finishBox = await page.locator('[data-test="finish"]').boundingBox();
    expect(finishBox).not.toBeNull();
    if (finishBox) {
      expect(finishBox.x + finishBox.width).toBeLessThanOrEqual(390);
    }
  });
});
