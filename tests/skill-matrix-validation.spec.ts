import { employeeTest as test } from '../fixtures';
import { expect } from '@playwright/test';
import { SkillMatrixPage } from '../pages/SkillMatrixPage';

test('Login and assert Dashboard page', async ({ authenticatedPage }) => {
  // Assert that the user is on the Dashboard page
  await expect(authenticatedPage).toHaveURL('https://app-boomerang-web-test-001.azurewebsites.net/');
});

test('Verify Quality Assurance designations and categories under Skill Matrix', async ({ authenticatedPage }) => {
  const skillMatrixPage = new SkillMatrixPage(authenticatedPage);
  await skillMatrixPage.goto();

  // Verify Quality Assurance section contains 6 designations
  const designations = await skillMatrixPage.getQualityAssuranceDesignations();
  await expect(designations).toHaveCount(6);

  // Click on Quality Assurance Engineer
  await skillMatrixPage.clickQualityAssuranceEngineer();

  // Updated categories to match the DOM (case and spacing)
  const categories = [
    'Technical/Job Knowledge',
    'Teamwork and Collaboration',
    'Leadership and Influence',
    'Customer/External Stakeholder Management',
    'Self-Management',
    'Future Readiness'
  ];
  await skillMatrixPage.verifyCategoriesAndSkills(categories);
});
