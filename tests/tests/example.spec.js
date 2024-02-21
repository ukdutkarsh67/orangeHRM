// @ts-check
const { test, expect } = require('@playwright/test');

test.only('sauce demo login functionality with valid data', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill("standard_user");
  await page.locator('#password').fill('secret_sauce');
  await page.locator('[name="login-button"]').click();
  await expect(page.locator('span.title')).toContainText('Products');
  await page.pause();
});

// test('sauce demo login functionality with valid data', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');
//   await page.getByPlaceholder('Username').fill("standard_user");
//   await page.locator('#password').fill('secret_sauce');
//   await page.locator('[name="login-button"]').click();
//   await expect(page.locator('span.title')).toContainText('Products');
// });



