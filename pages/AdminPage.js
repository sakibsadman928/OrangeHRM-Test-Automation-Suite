const { BasePage } = require('./BasePage');

class AdminPage extends BasePage {
  constructor(page) {
    super(page);

    this.addButton = page.getByRole('button', { name: 'Add' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.usernameSearchInput = page.locator('.oxd-table-filter-area .oxd-input').first();
    this.tableRows = page.locator('.oxd-table-card');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.requiredFieldErrors = page.locator('.oxd-input-field-error-message');
  }

  async searchByUsername(username) {
    await this.usernameSearchInput.fill(username);
    await this.searchButton.click();
    await this.waitForLoader();
  }

  async resetFilters() {
    await this.resetButton.click();
    await this.waitForLoader();
  }

  async openAddUserForm() {
    await this.addButton.click();
    await this.waitForLoader();
  }

  async cancelAddUserForm() {
    await this.cancelButton.click();
    await this.waitForLoader();
  }
}

module.exports = { AdminPage };
