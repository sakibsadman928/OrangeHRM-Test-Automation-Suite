const { BasePage } = require('./BasePage');

class MyInfoPage extends BasePage {
  constructor(page) {
    super(page);

    this.employeeFullNameHeader = page.locator('.orangehrm-edit-employee-name');

    this.personalDetailsTab = page.getByText('Personal Details', { exact: true });
    this.contactDetailsTab = page.getByText('Contact Details', { exact: true });
    this.emergencyContactsTab = page.getByText('Emergency Contacts', { exact: true });
  }
}

module.exports = { MyInfoPage };
