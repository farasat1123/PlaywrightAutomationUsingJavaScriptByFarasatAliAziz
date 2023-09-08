const { chromium } = require('@playwright/test');
const { test, expect } = require('@playwright/test');

test('Google Search and Page Title Test', async ({ page }) => {
  const textArray = ['Playwright', 'Fast and reliable end-to-end testing for modern web apps | Playwright'];

  // Go to Google and search for the 1st array entry
  await page.goto('https://www.google.com');
  await page.pause();
  await page.getByLabel('Search', { exact: true }).fill(textArray[0]);
  await page.keyboard.press('Enter');

  // Wait for the search results to load (adjust the selector as needed)
  await page.waitForSelector('.g');

  // Click on the first search result
  await page.click('.g a');

  // Get the page title
  const pageTitle = await page.title();
  expect(pageTitle).toBe(textArray[1]);
});
