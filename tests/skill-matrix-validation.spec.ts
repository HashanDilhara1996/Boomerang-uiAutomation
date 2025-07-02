import { test as base, Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

import { employeeTest as test } from '../fixtures';
import { expect } from '@playwright/test';
import { SkillMatrixPage } from '../pages/SkillMatrixPage';

test('Login and assert Dashboard page', async ({ authenticatedPage }) => {
  // Assert that the user is on the Dashboard page
  await expect(authenticatedPage).toHaveURL(process.env.BOOMERANG_URL!);
  console.log('✅ Successfully navigated to Dashboard page:', process.env.BOOMERANG_URL);
});

test('Verify Quality Assurance designations and categories under Skill Matrix', async ({ authenticatedPage }) => {
  const skillMatrixPage = new SkillMatrixPage(authenticatedPage);
  await skillMatrixPage.goto();
  console.log('🔎 Navigated to Skill Matrix page');

  // Verify Quality Assurance section contains 6 designations
  const designations = await skillMatrixPage.getQualityAssuranceDesignations();
  await expect(designations).toHaveCount(6);
  console.log('✅ Quality Assurance section contains 6 designations');

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
  console.log('✅ Verified all expected categories and skills for Quality Assurance Engineer');
});
