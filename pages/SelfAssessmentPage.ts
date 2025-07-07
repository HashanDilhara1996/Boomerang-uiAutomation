import { Page, expect, Locator } from '@playwright/test';
import { getRandomIntBetween } from '../utils/testUtils';

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
    this.feedbackRequestsTable = this.page.locator("//table[contains(@class,'w-full caption-bottom')]/tbody[1]");
    this.skillAssessmentsHeading = this.page.getByRole('heading', { name: /Skill Assessments/i });
    this.saveAsDraftButton = this.page.getByRole('button', { name: /Save as draft/i });
  }

  async gotoFeedbackRequests() {
    await this.feedbackRequestsNav.click();
    await expect(this.feedbackRequestsHeading).toBeVisible();
    await expect(this.feedbackRequestsTable).toBeVisible();
  }

  async openSelfAssessmentRow(targetTitle: string) {
    const rows = this.feedbackRequestsTable.locator('tr');
    const rowCount = await rows.count();
    console.log(`🔎 Found ${rowCount} rows in feedback requests table.`);
    if (rowCount === 0) {
      throw new Error('No rows found in feedback requests table');
    }
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const titleCell = row.locator('td').nth(0);
      const typeCell = row.locator('td').nth(2);
      const titleText = (await titleCell.textContent() || '').replace(/\s+/g, ' ').trim().toLowerCase();
      const typeText = (await typeCell.textContent() || '').replace(/\s+/g, ' ').trim().toLowerCase();
      console.log(`Row ${i}: title="${titleText}", type="${typeText}"`);
      if (titleText.includes(targetTitle.toLowerCase()) && typeText === 'self') {
        await row.click();
        console.log(`✅ Clicked row ${i} for self assessment: ${titleText}`);
        return;
      }
    }
  }

  async waitForForm() {
    await expect(this.skillAssessmentsHeading).toBeVisible();
  }

  async fillSkillRatingsByCategories(getRandomInt: (max: number) => number) {
  const skillLabels = this.page.locator("xpath=//div[@class='col-span-4']//label");
  const skillCount = await skillLabels.count();

  for (let i = 1; i <= skillCount; i++) {
    const randomRating = getRandomIntBetween(1, 5); // random between 1 and 5
    const ratingButton = this.page.locator(`button[aria-label='Rate ${randomRating} out of 5'] >> svg.lucide-circle`).nth(i - 1);
    await ratingButton.scrollIntoViewIfNeeded();
    await ratingButton.waitFor({ state: 'visible', timeout: 1000 });
    await ratingButton.click();
    await this.page.waitForTimeout(1000);
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
