const { BasePage } = require('./BasePage');

class RecruitmentPage extends BasePage {
  constructor(page) {
    super(page);

    this.addButton = page.getByRole('button', { name: 'Add' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.requiredFieldErrors = page.locator('.oxd-input-field-error-message');
    this.tableRows = page.locator('.oxd-table-card');

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.locator('input[name="email"]');
  }

  async openAddCandidateForm() {
    await this.addButton.click();
    await this.waitForLoader();
  }

  async fillCandidateBasicInfo({ firstName, lastName, email }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
  }
}

module.exports = { RecruitmentPage };
