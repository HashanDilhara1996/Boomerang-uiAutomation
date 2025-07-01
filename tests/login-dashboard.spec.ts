import { test, expect } from '@playwright/test';

test('Login and assert Dashboard page', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://app-boomerang-web-test-001.azurewebsites.net/');

  // Enter username and password
  await page.fill('input[name="username"]', 'testautomation@gmail.com');
  await page.fill('input[name="password"]', '12345');

  // Click the login button
  await page.click('button[type="submit"]');

  // Wait for navigation to Dashboard page
  await page.waitForURL('https://app-boomerang-web-test-001.azurewebsites.net/');

  
test('Navigate to Skill Matrix page and perform basic assertions', async ({ page }) => {
  // Navigate to the Skill Matrix page via the side navigation bar
  await page.click('nav >> text=Skill Matrix');

  // Wait for the Skill Matrix page to load
  await page.waitForURL('**/skill-matrix');

  // Assert that the Skill Matrix page contains expected elements
  const skillMatrixHeader = await page.locator('h1');
  await expect(skillMatrixHeader).toHaveText('Skill Matrix');

  const skillTable = await page.locator('table.skill-matrix');
  await expect(skillTable).toBeVisible();
});

test('Verify Quality Assurance designations and categories under Skill Matrix', async ({ page }) => {
  // Navigate to the Skill Matrix page via the side navigation bar
  await page.click('nav >> text=Skill Matrix');

  // Wait for the Skill Matrix page to load
  await page.waitForURL('**/skill-matrix');

  // Verify Quality Assurance section contains 6 designations
  const qaSection = await page.locator('section >> text=Quality Assurance');
  const designations = await qaSection.locator('li.designation');
  await expect(designations).toHaveCount(6);

  // Click on Quality Assurance Engineer
  await qaSection.locator('li.designation >> text=Quality Assurance Engineer').click();

  // Verify categories under Quality Assurance Engineer
  const categories = [
    'Technical/Job knowledge',
    'Teamwork and collaboration',
    'Leadership and influence',
    'Customer/external stakeholder management',
    'Self-management',
    'Future readiness'
  ];

  for (const category of categories) {
    const categoryElement = await page.locator(`section >> text=${category}`);
    await expect(categoryElement).toBeVisible();

    // Verify skills are present under each category
    const skills = await categoryElement.locator('ul.skills > li');
    await expect(skills).not.toHaveCount(0);
  }
});
