const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const testData = require('../utils/testData');

test.describe('Login Module', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC01 - Login with valid credentials navigates to Dashboard', async ({ page }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.pageHeader).toHaveText('Dashboard');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('TC02 - Login with invalid username shows error message', async () => {
    await loginPage.login('WrongUser', testData.validUser.password);
    await expect(loginPage.errorAlert).toBeVisible();
    await expect(loginPage.errorAlert).toHaveText('Invalid credentials');
  });

  test('TC03 - Login with invalid password shows error message', async () => {
    await loginPage.login(testData.validUser.username, 'wrongPassword123');
    await expect(loginPage.errorAlert).toBeVisible();
    await expect(loginPage.errorAlert).toHaveText('Invalid credentials');
  });

  test('TC04 - Login with empty username shows required field error', async () => {
    await loginPage.passwordInput.fill(testData.validUser.password);
    await loginPage.loginButton.click();
    await expect(loginPage.requiredFieldErrors).toHaveCount(1);
    await expect(loginPage.requiredFieldErrors.first()).toHaveText('Required');
  });

  test('TC05 - Login with empty username and password shows required errors for both fields', async () => {
    await loginPage.loginButton.click();
    await expect(loginPage.requiredFieldErrors).toHaveCount(2);
  });

  test('TC06 - Forgot your password link navigates to Reset Password page', async () => {
    await loginPage.clickForgotPassword();
    await expect(loginPage.resetPasswordHeader).toBeVisible();
  });
});
