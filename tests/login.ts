import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app-boomerang-keycloak-dev-001.azurewebsites.net/realms/Boomerang-Test/protocol/openid-connect/auth?client_id=boomerang-test&scope=openid%20email%20profile%20offline_access&response_type=code&redirect_uri=https%3A%2F%2Fapp-boomerang-web-test-001.azurewebsites.net%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=P5zYdlIbkoCtGXubhoz6jFwuXZwmu7w4-u6yKpfnS9c&code_challenge=9GvL8KNE_-AIeRu6kE9EpFIwZGSSOxKK0FBcrce2rJQ&code_challenge_method=S256');
  await page.getByRole('textbox', { name: 'Username or email' }).click();
  await page.getByRole('textbox', { name: 'Username or email' }).fill('wasana@ascentic.se');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('12345');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});