const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const testData = require('../utils/testData');

test.describe('Navigation', () => {
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    dashboardPage = new DashboardPage(page);
    await dashboardPage.pageHeader.waitFor({ state: 'visible' });
  });

  test('TC29 - All main sidebar menu items navigate to the correct module pages', async () => {
    const modules = ['Admin', 'PIM', 'Recruitment', 'My Info', 'Dashboard'];

    for (const moduleName of modules) {
      await dashboardPage.navigateTo(moduleName);
      const expectedHeader = moduleName === 'My Info' ? 'PIM' : moduleName;
      await expect(dashboardPage.pageHeader).toContainText(expectedHeader);
    }
  });
});
