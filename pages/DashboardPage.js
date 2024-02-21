exports.DashboardPage=class 
DashboardPage{
    constructor(page){
        this.page=page;
        this.pageHeading=page.locator('.oxd-topbar-header-breadcrumb h6');
    }

    async clickOnPageLink(pageName){
        await this.page.getByRole('link', { name: pageName }).click();
    }

    async verifyNavPage(pageHead){
        await expect(this.pageHeading).toHaveText(pageHead);
    }
}