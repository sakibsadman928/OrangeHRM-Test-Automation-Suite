const { BasePage } = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.userDropdownName = page.locator('.oxd-userdropdown-name');
  }

  async getLoggedInUserName() {
    return this.userDropdownName.innerText();
  }
}

module.exports = { DashboardPage };
