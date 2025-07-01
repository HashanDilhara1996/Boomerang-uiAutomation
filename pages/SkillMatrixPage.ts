import { Page, Locator, expect } from '@playwright/test';

export class SkillMatrixPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.getByRole('listitem').getByText('Skill Matrix', { exact: true }).click();
    await this.page.waitForURL('**/skill-matrix');
  }

  async getQualityAssuranceDesignations() {
    // Find the heading for Quality Assurance
    const qaHeading = await this.page.getByRole('heading', { level: 3, name: 'Quality Assurance' });
    // Go to the parent, then select the next sibling (container with designations)
    const qaParent = await qaHeading.locator('..');
    const qaSiblings = await qaParent.locator('xpath=following-sibling::*');
    // The first sibling is the container with designations
    const designationContainer = qaSiblings.nth(0);
    // All direct children divs (each is a designation container)
    return designationContainer.locator('div > div > span');
  }

  async clickQualityAssuranceEngineer() {
    const qaHeading = await this.page.getByRole('heading', { level: 3, name: 'Quality Assurance' });
    const qaParent = await qaHeading.locator('..');
    const qaSiblings = await qaParent.locator('xpath=following-sibling::*');
    const designationContainer = qaSiblings.nth(0);
    await designationContainer.getByText('Quality Assurance Engineer', { exact: true }).click();
  }

  async verifyCategoriesAndSkills(categories: string[]) {
    const skillsTabPanel = await this.page.getByRole('tabpanel', { name: /Skills/i });
    for (const category of categories) {
      // Use partial and case-insensitive match for category label
      const categoryLabel = skillsTabPanel.getByText(new RegExp(category, 'i'), { exact: false });
      await expect(categoryLabel).toBeVisible();
      const categoryContainer = await categoryLabel.locator('..');
      const skills = await categoryContainer.locator('h3');
      await expect(skills).not.toHaveCount(0);
    }
  }
}
