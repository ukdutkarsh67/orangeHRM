import { expect } from "@playwright/test";
exports.LoginPage=class LoginPage {
    constructor(page) {
      this.page = page;
      this.userName = page.getByPlaceholder('Username');
      this.password = page.getByPlaceholder('Password');
      this.loginPageLogo = page.locator(".login_logo");
      this.loginButton = page.locator('[type="submit"]');
      this.errorMessageForInvalidData = page.locator('[class="oxd-text oxd-text--p oxd-alert-content-text"]');
      this.errorMessageForBlankData = page.locator('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]'); 
      this.loginSuccessfulMessage= page.locator('.oxd-topbar-header-breadcrumb h6');
    }

    async goToLogin(){
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }
  
    async fillUserName(userNameText) {
      await this.userName.fill(userNameText);
    }
  
    async fillPassword(passwordText) {
      await this.password.fill(passwordText);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async verifyErrorMessageForInvalidData(){
        await expect(this.errorMessageForInvalidData).toContainText('Invalid credentials');
    }

    async verifyErrorMessageForBlankData(){
        await expect(this.errorMessageForBlankData.first()).toContainText('Required');
    }

    async verifyUserSuccessfulLoginMessage(){
        await expect(this.loginSuccessfulMessage).toHaveText('Dashboard');;
    }

}