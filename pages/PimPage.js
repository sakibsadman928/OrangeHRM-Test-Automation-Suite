const { BasePage } = require('./BasePage');

class PimPage extends BasePage {
  constructor(page) {
    super(page);

    this.addButton = page.getByRole('button', { name: 'Add' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.employeeNameSearchInput = page.getByPlaceholder('Type for hints...').first();
    this.recordsFoundText = page.locator('.orangehrm-horizontal-padding span.oxd-text--span').first();

    // Add Employee form
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.requiredFieldErrors = page.locator('.oxd-input-field-error-message');
    this.employeeFullNameHeader = page.locator('.orangehrm-edit-employee-name');
  }

  async openAddEmployeeForm() {
    await this.addButton.click();
    await this.waitForLoader();
  }

  async cancelAddEmployeeForm() {
    await this.cancelButton.click();
    await this.waitForLoader();
  }

  async addEmployee(firstName, lastName) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }

  async searchByEmployeeName(name) {
    await this.employeeNameSearchInput.fill(name);
    await this.page.locator('.oxd-autocomplete-option').first().waitFor({ state: 'visible' });
    await this.page.locator('.oxd-autocomplete-option').first().click();
    await this.searchButton.click();
  }

  async resetFilters() {
    await this.resetButton.click();
  }
}

module.exports = { PimPage };
