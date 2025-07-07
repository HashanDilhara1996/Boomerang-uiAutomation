import { test as base, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export const employeeTest = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto(process.env.BOOMERANG_URL!);
    await page.fill('input[name="username"]', process.env.EMPLOYEE_USERNAME!);
    await page.fill('input[name="password"]', process.env.EMPLOYEE_PASSWORD!);
    await page.click('button[type="submit"]');
    await page.waitForURL(process.env.BOOMERANG_URL!);
    await use(page);
  },
});

export const managerTest = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto(process.env.BOOMERANG_URL!);
    await page.fill('input[name="username"]', process.env.MANAGER_USERNAME!);
    await page.fill('input[name="password"]', process.env.MANAGER_PASSWORD!);
    await page.click('button[type="submit"]');
    await page.waitForURL(process.env.BOOMERANG_URL!);
    await use(page);
  },
});

export const hrTest = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto(process.env.BOOMERANG_URL!);
    await page.fill('input[name="username"]', process.env.HR_USERNAME!);
    await page.fill('input[name="password"]', process.env.HR_PASSWORD!);
    await page.click('button[type="submit"]');
    await page.waitForURL(process.env.BOOMERANG_URL!);
    await use(page);
  },
});
