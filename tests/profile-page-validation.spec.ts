import { test as base, Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

import { employeeTest as test } from '../fixtures';
import { ProfilePage } from '../pages/ProfilePage';

test.describe('Profile Page Validation', () => {
  test('Navigate to Profile and validate content', async ({ authenticatedPage }) => {
    const profilePage = new ProfilePage(authenticatedPage);
    await profilePage.gotoFromSidebar();
    console.log('🔎 Navigated to Profile page from sidebar');
    await profilePage.validateProfileContent();
    console.log('✅ Profile content validated successfully');
  });
});
