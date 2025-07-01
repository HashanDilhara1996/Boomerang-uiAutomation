import { test as base, Page } from '@playwright/test';

export const employeeTest = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('https://app-boomerang-web-test-001.azurewebsites.net/');
    await page.fill('input[name="username"]', 'testautomation@gmail.com');
    await page.fill('input[name="password"]', '12345');
    await page.click('button[type="submit"]');
    await page.waitForURL('https://app-boomerang-web-test-001.azurewebsites.net/');
    await use(page);
  },
});
