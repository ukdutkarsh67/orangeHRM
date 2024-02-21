import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('Search', { exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('playwri');
  await page.getByText('playwright', { exact: true }).click();
  await page.getByRole('link', { name: 'Installation' }).click();
  await page.getByRole('link', { name: 'How to open the HTML test' }).click();
});