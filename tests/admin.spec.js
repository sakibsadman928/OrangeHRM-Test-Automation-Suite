const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { AdminPage } = require('../pages/AdminPage');
const testData = require('../utils/testData');

test.describe('Admin Module', () => {
  let adminPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateTo('Admin');

    adminPage = new AdminPage(page);
  });

  test('TC10 - Admin page loads with User Management table', async () => {
    await expect(adminPage.pageHeader).toHaveText('Admin');
    await expect(adminPage.tableRows.first()).toBeVisible();
  });

  test('TC11 - Search user by username filters table results', async () => {
    await adminPage.searchByUsername(testData.validUser.username);
    await expect(adminPage.tableRows.first()).toContainText(testData.validUser.username);
  });

  test('TC12 - Add button opens Add User form', async ({ page }) => {
    await adminPage.openAddUserForm();
    await expect(page.getByRole('heading', { name: 'Add User' })).toBeVisible();
  });

  test('TC13 - Add User form shows required field validation when saved empty', async () => {
    await adminPage.openAddUserForm();
    await adminPage.saveButton.click();
    await expect(adminPage.requiredFieldErrors.first()).toBeVisible();
  });

  test('TC14 - Reset button clears the username search filter', async () => {
    await adminPage.searchByUsername(testData.validUser.username);
    await adminPage.resetFilters();
    await expect(adminPage.usernameSearchInput).toHaveValue('');
  });

  test('TC15 - Cancel button on Add User form returns to the User Management list', async ({ page }) => {
    await adminPage.openAddUserForm();
    await expect(page.getByRole('heading', { name: 'Add User' })).toBeVisible();

    await adminPage.cancelAddUserForm();
    await expect(page.getByRole('heading', { name: 'Add User' })).not.toBeVisible();
    await expect(adminPage.pageHeader).toHaveText('Admin');
  });
});
