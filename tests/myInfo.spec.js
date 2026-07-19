const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { MyInfoPage } = require('../pages/MyInfoPage');
const testData = require('../utils/testData');

test.describe('My Info Module', () => {
  let myInfoPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateTo('My Info');

    myInfoPage = new MyInfoPage(page);
  });

  test('TC23 - My Info page loads Personal Details for logged-in employee', async ({ page }) => {
    await expect(page).toHaveURL(/pim/);
    await expect(myInfoPage.employeeFullNameHeader).toBeVisible();
  });

  test('TC24 - Navigate back to Personal Details tab shows the employee name header', async () => {
    await myInfoPage.contactDetailsTab.click();
    await myInfoPage.personalDetailsTab.click();
    await expect(myInfoPage.employeeFullNameHeader).toBeVisible();
  });

  test('TC25 - Navigate between My Info tabs', async ({ page }) => {
    await myInfoPage.contactDetailsTab.click();
    await expect(page).toHaveURL(/pim/);

    await myInfoPage.emergencyContactsTab.click();
    await expect(page).toHaveURL(/pim/);
  });
});
