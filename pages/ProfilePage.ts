import { Page, expect, Locator } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  // Element locators
  readonly employeeNameButton: Locator;
  readonly profileMenuItem: Locator;
  readonly nameHeading: Locator;
  readonly tagDesignationDept: Locator;
  readonly generalHeading: Locator;
  readonly employmentInfoHeading: Locator;
  readonly assignedChiefLabel: Locator;
  readonly assignedChiefValue: Locator;
  readonly designationLabel: Locator;
  readonly designationValue: Locator;
  readonly departmentLabel: Locator;
  readonly departmentValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeNameButton = this.page.locator('xpath=/html/body/div[1]/div/div[2]/div/div[3]/ul/li/button');
    this.profileMenuItem = this.page.getByRole('menuitem', { name: /Profile/i });
    this.nameHeading = this.page.getByRole('heading', { name: /Employee/i });
    this.tagDesignationDept = this.page.getByText(/Permanent.*Quality Assurance Engineer.*Quality Assurance/i);
    this.generalHeading = this.page.getByRole('heading', { name: /General/i });
    this.employmentInfoHeading = this.page.getByRole('heading', { name: /Employment Information/i });
    this.assignedChiefLabel = this.page.getByText('Assigned chief', { exact: true });
    this.designationLabel = this.page.getByText('Designation', { exact: true });
    this.departmentLabel = this.page.getByText('Department', { exact: true });
    // Values are relative to their labels
    this.assignedChiefValue = this.assignedChiefLabel.locator('xpath=following-sibling::p[1]');
    this.designationValue = this.designationLabel.locator('xpath=following-sibling::p[1]');
    this.departmentValue = this.departmentLabel.locator('xpath=following-sibling::p[1]');
  }

  async gotoFromSidebar() {
    // Click on the employee name at the bottom of the sidebar using provided XPath
    const employeeNameButton = this.page.locator('xpath=/html/body/div[1]/div/div[2]/div/div[3]/ul/li/button');
    await employeeNameButton.click();
    // Click on the Profile option in the menu
    await this.page.getByRole('menuitem', { name: /Profile/i }).click();
    await this.page.waitForURL('**/profile');
    console.log('🔎 Navigated to Profile page via sidebar and menu');
  }

  async validateProfileContent() {
    // Employee name at the top
    const nameHeading = this.page.getByRole('heading', { name: /Employee/i });
    await expect(nameHeading).toBeVisible();
    console.log('✅ Employee name heading is visible');

    // Permanent tag, designation, and department
    const tagDesignationDept = this.page.getByText(/Permanent.*Quality Assurance Engineer.*Quality Assurance/i);
    await expect(tagDesignationDept).toBeVisible();
    await expect(tagDesignationDept).toContainText('Permanent');
    await expect(tagDesignationDept).toContainText('Quality Assurance Engineer');
    await expect(tagDesignationDept).toContainText('Quality Assurance');
    console.log('✅ Permanent tag, Designation, and Department are visible and correct');

    // Heading General
    await expect(this.page.getByRole('heading', { name: /General/i })).toBeVisible();
    console.log('✅ General heading is visible');

    // Heading Employment Information
    await expect(this.page.getByRole('heading', { name: /Employment Information/i })).toBeVisible();
    console.log('✅ Employment Information heading is visible');

    // Under Employment Information: Assigned chief, Designation, Department should not be empty
    const assignedChiefLabel = this.page.getByText('Assigned chief', { exact: true });
    await expect(assignedChiefLabel).toBeVisible();
    const assignedChiefValue = assignedChiefLabel.locator('xpath=following-sibling::p[1]');
    await expect(assignedChiefValue).toBeVisible();
    await expect(assignedChiefValue).not.toHaveText(/^\s*$/);
    console.log('✅ Assigned chief is visible and not empty');

    // Designation
    const designationLabel = this.page.getByText('Designation', { exact: true });
    await expect(designationLabel).toBeVisible();
    const designationValue = designationLabel.locator('xpath=following-sibling::p[1]');
    await expect(designationValue).toBeVisible();
    await expect(designationValue).not.toHaveText(/^\s*$/);
    console.log('✅ Designation is visible and not empty');

    // Department
    const departmentLabel = this.page.getByText('Department', { exact: true });
    await expect(departmentLabel).toBeVisible();
    const departmentValue = departmentLabel.locator('xpath=following-sibling::p[1]');
    await expect(departmentValue).toBeVisible();
    await expect(departmentValue).not.toHaveText(/^\s*$/);
    console.log('✅ Department is visible and not empty');
  }
}
