import { expect } from '@playwright/test';
import { employeeTest as test } from '../fixtures';
import { SelfAssessmentPage } from '../pages/SelfAssessmentPage';
import { getRandomIntBetween, getRandomText } from '../utils/testUtils';

test('Employee can fill self assessment form and save as draft', async ({ authenticatedPage }) => {
  const selfAssessmentPage = new SelfAssessmentPage(authenticatedPage);
  await selfAssessmentPage.gotoFeedbackRequests();
  await selfAssessmentPage.openSelfAssessmentRow('appraisal for test automation');
  await selfAssessmentPage.waitForForm();

  // Fill skill ratings by categories
  await selfAssessmentPage.fillSkillRatingsByCategories((max) => getRandomIntBetween(1, 5));

  await selfAssessmentPage.fillCategoryFeedback(getRandomText);
  await selfAssessmentPage.fillGeneralFeedback(getRandomText);
  await selfAssessmentPage.fillOverallComment(getRandomText);
  await selfAssessmentPage.saveAsDraft();
});
