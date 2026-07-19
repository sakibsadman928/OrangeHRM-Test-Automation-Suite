/**
 * BasePage
 * Elements & actions shared by every page the user sees AFTER logging in:
 * the top header, the left sidebar menu, and the user/logout dropdown.
 * Module-specific page objects extend this class.
 */
class BasePage {
  constructor(page) {
    this.page = page;

    // Breadcrumb can render TWO h6s (module name + sub-page name, e.g.
    // "Admin" and "User Management"). Scope to the module-level one only,
    // or toHaveText()/waitFor() throws a strict-mode "resolved to 2 elements" error.
    this.pageHeader = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' });

    // OrangeHRM shows a brief spinner overlay after most navigations/clicks
    // while it fetches data; interacting too soon gets the click intercepted.
    this.loader = page.locator('.oxd-form-loader');
  }

  /** Locator for a sidebar menu item by its visible text, e.g. "Admin", "PIM" */
  sidebarItem(moduleName) {
    return this.page.locator('.oxd-main-menu-item', { hasText: moduleName });
  }

  /** Wait for the loading spinner (if any) to disappear before interacting further */
  async waitForLoader() {
    await this.loader.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }

  /** Click a sidebar item to move to another module */
  async navigateTo(moduleName) {
    await this.sidebarItem(moduleName).click();
    await this.waitForLoader();
    await this.pageHeader.waitFor({ state: 'visible' });
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutMenuItem.click();
  }
}

module.exports = { BasePage };
