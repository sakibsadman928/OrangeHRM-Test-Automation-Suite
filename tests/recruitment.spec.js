const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { RecruitmentPage } = require('../pages/RecruitmentPage');
const testData = require('../utils/testData');

test.describe('Recruitment Module', () => {
  let recruitmentPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateTo('Recruitment');

    recruitmentPage = new RecruitmentPage(page);
  });

  test('TC26 - Recruitment Candidates page loads', async () => {
    await expect(recruitmentPage.pageHeader).toContainText('Recruitment');
  });

  test('TC27 - Recruitment Candidates table is visible', async () => {
    await expect(recruitmentPage.tableRows.first()).toBeVisible();
  });

  test('TC28 - Add Candidate form opens with required fields', async ({ page }) => {
    await recruitmentPage.openAddCandidateForm();
    await expect(page.getByRole('heading', { name: 'Add Candidate' })).toBeVisible();

    await recruitmentPage.saveButton.click();
    await expect(recruitmentPage.requiredFieldErrors.first()).toBeVisible();
  });
});
