const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { PimPage } = require('../pages/PimPage');
const testData = require('../utils/testData');

test.describe('PIM Module', () => {
  let pimPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateTo('PIM');

    pimPage = new PimPage(page);
  });

  test('TC16 - PIM Employee List page loads with records', async () => {
    await expect(pimPage.pageHeader).toHaveText('PIM');
    await expect(pimPage.recordsFoundText).toBeVisible();
  });

  test('TC17 - Add Employee form validation for required first/last name', async () => {
    await pimPage.openAddEmployeeForm();
    await pimPage.saveButton.click();
    await expect(pimPage.requiredFieldErrors.first()).toBeVisible();
  });

  test('TC18 - Successfully add new employee with valid first/last name', async () => {
    const lastName = `Auto${Date.now()}`;
    await pimPage.openAddEmployeeForm();
    await pimPage.addEmployee('Test', lastName);
    await expect(pimPage.employeeFullNameHeader).toContainText(lastName);
  });

  test('TC19 - Search employee by name filters results', async () => {
    await pimPage.searchByEmployeeName('a');
    await expect(pimPage.recordsFoundText).toBeVisible();
  });

  test('TC20 - Reset button clears search filters', async () => {
    await pimPage.searchByEmployeeName('a');
    await pimPage.resetFilters();
    await expect(pimPage.recordsFoundText).toBeVisible();
  });

  test('TC21 - Employee List "Records Found" count is displayed', async () => {
    const text = await pimPage.recordsFoundText.innerText();
    expect(text).toMatch(/Records Found/);
  });

  test('TC22 - Cancel button on Add Employee form returns to the Employee List', async () => {
    await pimPage.openAddEmployeeForm();
    await expect(pimPage.firstNameInput).toBeVisible();

    await pimPage.cancelAddEmployeeForm();
    await expect(pimPage.firstNameInput).not.toBeVisible();
    await expect(pimPage.pageHeader).toHaveText('PIM');
  });
});
