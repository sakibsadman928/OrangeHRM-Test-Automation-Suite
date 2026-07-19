const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const testData = require('../utils/testData');

test.describe('Dashboard Module', () => {
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    dashboardPage = new DashboardPage(page);
    await dashboardPage.pageHeader.waitFor({ state: 'visible' });
  });

  test('TC07 - Dashboard page loads with correct header after login', async () => {
    await expect(dashboardPage.pageHeader).toHaveText('Dashboard');
  });

  test('TC08 - User can logout successfully via user dropdown', async ({ page }) => {
    await dashboardPage.logout();
    await expect(page).toHaveURL(/auth\/login/);
    await expect(page.getByPlaceholder('Username')).toBeVisible();
  });

  test('TC09 - User dropdown displays logged-in username', async () => {
    const name = await dashboardPage.getLoggedInUserName();
    expect(name.trim().length).toBeGreaterThan(0);
  });
});
