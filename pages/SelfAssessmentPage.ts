import { Page, expect, Locator } from '@playwright/test';

export class SelfAssessmentPage {
  readonly page: Page;
  // Element locators
  readonly feedbackRequestsNav: Locator;
  readonly feedbackRequestsHeading: Locator;
  readonly feedbackRequestsTable: Locator;
  readonly skillAssessmentsHeading: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.feedbackRequestsNav = this.page.getByText('Feedback Requests', { exact: true });
    this.feedbackRequestsHeading = this.page.getByRole('heading', { name: /Feedback Requests/i });
    this.feedbackRequestsTable = this.page.locator('table tbody');
    this.skillAssessmentsHeading = this.page.getByRole('heading', { name: /Skill Assessments/i });
    this.saveAsDraftButton = this.page.getByRole('button', { name: /Save as draft/i });
  }

  async gotoFeedbackRequests() {
    await this.feedbackRequestsNav.click();
    await expect(this.feedbackRequestsHeading).toBeVisible();
    await expect(this.feedbackRequestsTable).toBeVisible();
  }

  async openSelfAssessmentRow() {
    const rows = this.feedbackRequestsTable.locator('tr');
    const rowCount = await rows.count();
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const titleCell = row.locator('td').nth(0);
      const typeCell = row.locator('td').nth(2);
      const titleText = (await titleCell.textContent() || '').replace(/\s+/g, ' ').trim().toLowerCase();
      const typeText = (await typeCell.textContent() || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (titleText.includes('appraisal for test automation') && typeText === 'self') {
        await row.click();
        return;
      }
    }
    throw new Error('Self assessment row not found');
  }

  async waitForForm() {
    await expect(this.skillAssessmentsHeading).toBeVisible();
  }

  async fillSkillRatings(skillRatingIds: string[], getRandomInt: (max: number) => number) {
    for (const id of skillRatingIds) {
      const ratingButtons = this.page.locator(`[id="${id}"] button[role="button"]`);
      const count = await ratingButtons.count();
      if (count > 0) {
        await ratingButtons.nth(getRandomInt(count)).click();
      }
    }
  }

  async fillCategoryFeedback(getRandomText: () => string) {
    for (let i = 0; i <= 5; i++) {
      const textarea = this.page.locator(`textarea[name="categories.${i}.comment"]`);
      if (await textarea.count()) {
        await textarea.fill(getRandomText());
      }
    }
  }

  async fillGeneralFeedback(getRandomText: () => string) {
    for (let i = 0; i <= 1; i++) {
      const textarea = this.page.locator(`textarea[name="questions.${i}.value"]`);
      if (await textarea.count()) {
        await textarea.fill(getRandomText());
      }
    }
  }

  async fillOverallComment(getRandomText: () => string) {
    const overallTextarea = this.page.locator('textarea[name="overallComment"]');
    if (await overallTextarea.count()) {
      await overallTextarea.fill(getRandomText());
    }
  }

  async saveAsDraft() {
    await this.page.waitForTimeout(3000);
    await this.saveAsDraftButton.click();
    await this.page.waitForTimeout(5000);
  }
}
