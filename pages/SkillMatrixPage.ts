import { Page, Locator, expect } from '@playwright/test';

export class SkillMatrixPage {
  readonly page: Page;
  // Element locators
  readonly skillMatrixNavItem: Locator;
  readonly qaHeading: Locator;
  readonly skillsTabPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.skillMatrixNavItem = this.page.getByRole('listitem').getByText('Skill Matrix', { exact: true });
    this.qaHeading = this.page.getByRole('heading', { level: 3, name: 'Quality Assurance' });
    this.skillsTabPanel = this.page.getByRole('tabpanel', { name: /Skills/i });
  }

  async goto() {
    await this.skillMatrixNavItem.click();
    await this.page.waitForURL('**/skill-matrix');
  }

  async getQualityAssuranceDesignations() {
    // Go container with designations
    const qaParent = await this.qaHeading.locator('..');
    const qaSiblings = await qaParent.locator('xpath=following-sibling::*');
    const designationContainer = qaSiblings.nth(0);
    // All direct children divs (each is a designation container)
    return designationContainer.locator('div > div > span');
  }

  async clickQualityAssuranceEngineer() {
    const qaParent = await this.qaHeading.locator('..');
    const qaSiblings = await qaParent.locator('xpath=following-sibling::*');
    const designationContainer = qaSiblings.nth(0);
    await designationContainer.getByText('Quality Assurance Engineer', { exact: true }).click();
  }

  async verifyCategoriesAndSkills(categories: string[]) {
    for (const category of categories) {
      // Use partial and case-insensitive match for category label
      const categoryLabel = this.skillsTabPanel.getByText(new RegExp(category, 'i'), { exact: false });
      await expect(categoryLabel).toBeVisible();
      const categoryContainer = await categoryLabel.locator('..');
      const skills = await categoryContainer.locator('h3');
      await expect(skills).not.toHaveCount(0);
    }
  }
}
