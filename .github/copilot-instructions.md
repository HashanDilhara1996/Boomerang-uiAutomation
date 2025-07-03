# 🤖 GitHub Copilot Instruction Guide – Test Automation Project

This guide instructs GitHub Copilot to generate clean, maintainable, and scalable code for our test automation project.

---

## 🔧 Project Stack

- **Language:** TypeScript / JavaScript
- **Test Framework:** Playwright
- **Pattern:** Page Object Model (POM)
- **Assertion:** Built-in or `expect`
- **Data Handling:** `.env` for credentials and secrets

---

## 📁 Project Structure

```
project/
├── tests/
│   └── login.test.ts
├── pages/
│   └── LoginPage.ts
├── fixtures/
│   └── baseFixture.ts
├── utils/
│   └── testData.ts
├── .env
└── playwright.config.ts
```

---

## 🧩 General Instructions for Copilot

### 🔸 Page Object Files (`pages/*.ts`)

```ts
// Copilot Instructions:
// 1. Place all element locators at the top of the class as private readonly members.
// 2. Use Playwright's locator strategy: page.locator('[data-testid="..."]') when available.
// 3. Write clearly named, reusable public methods for user actions.
// 4. Avoid hardcoding credentials – retrieve from process.env.
// 5. Export a single class per page.
```

Example structure:

```ts
export class LoginPage {
  constructor(private page: Page) {}

  // 🔐 Element locators – always at the top
  private readonly usernameField = this.page.locator('#username');
  private readonly passwordField = this.page.locator('#password');
  private readonly loginButton = this.page.locator('button[type="submit"]');

  // ✅ Methods
  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    console.log('✅ Login form submitted');
  }
}
```

---

### 🔸 Test Files (`tests/*.test.ts`)

```ts
// Copilot Instructions:
// 1. Use describe/test or test/it blocks.
// 2. Follow Arrange-Act-Assert pattern.
// 3. Avoid hardcoding credentials – load them from process.env.
// 4. Use page object methods instead of writing selectors in test files.
// 5. Use meaningful test names.
// 6. Add console.log statements after significant actions for better traceability.
```

Example:

```ts
test('Verify employee login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
  console.log('✅ User successfully logged in');
});
```

---

### 🔸 Environment Variables (`.env`)

```env
# Copilot Instructions:
# Store all login credentials, tokens, and secrets here
USERNAME=your_username
PASSWORD=your_password
URL=https://your-app-url.com
EMPLOYEE_USERNAME=employee_user
EMPLOYEE_PASSWORD=employee_pass
MANAGER_USERNAME=managaer_username
MANAGER_PASSWORD=manager_password
```

> Never hardcode sensitive data in test files or page object classes.

---

### 🔸 Fixtures & Setup (`fixtures/baseFixture.ts`)

```ts
// Copilot Instructions:
// Use Playwright test.extend() to create custom fixtures like authenticated sessions.
// Make reusable for login, mock setup, or data preconditions.

import { test as base, Page } from '@playwright/test';

export const employeeTest = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto(process.env.URL!);
    await page.fill('input[name="username"]', process.env.EMPLOYEE_USERNAME!);
    await page.fill('input[name="password"]', process.env.EMPLOYEE_PASSWORD!);
    await page.click('button[type="submit"]');
    await page.waitForURL(process.env.URL!);
    console.log('🔐 Employee logged in successfully');
    await use(page);
  },
});

export const managerTest = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto(process.env.URL!);
    await page.fill('input[name="username"]', process.env.MANAGER_USERNAME!);
    await page.fill('input[name="password"]', process.env.MANAGER_PASSWORD!);
    await page.click('button[type="submit"]');
    await page.waitForURL(process.env.URL!);
    console.log('🔐 Manager logged in successfully');
    await use(page);
  },
});
```

---

### 🚫 Things Copilot Should Avoid

- ❌ Avoid writing selectors inline in test files.
- ❌ Avoid using CSS class selectors or nth-child.
- ❌ Avoid hardcoding data, especially credentials.
- ❌ Avoid repeating locator code in multiple methods.

---

Let me know if you want this embedded as comments across files automatically, or want this tailored for another framework (like WebDriverIO or Robot Framework).