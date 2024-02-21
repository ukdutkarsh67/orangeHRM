exports.TimesheetPage=class TimesheetPage{
    constructor(page){
        this.page=page; 
        this.employeeName=page.getByPlaceholder('Type for hints...');
        this.viewButton=page.locator('[type="submit"]');
        this.viewTime=page.locator('[class="oxd-icon-button oxd-main-menu-button"]');
        this.editButton=page.locator('[class="oxd-button oxd-button--medium oxd-button--ghost"]');
        this.projectName=page.getByPlaceholder('Type for hints...');
        this.selectActivity=page.locator('[class="oxd-select-text-input"]');
        this.emp=page.locator('.oxd-table-card-cell .data').nth(0);

    }
    async getTextEmp(){
        const empp=await this.emp.textContent();
        return empp;
    }
    async ViewTimeSheet(empName){
        await this.employeeName.press_sequentially(empName);
        await this.page.getByRole('option',{name:empName}).locator('span').click();
        await this.viewButton.click();    
    }

    async clickViewTimesheet(){
        await this.viewTime.click();
    }

    async clickEditTimesheet(){
        await this.editButton.click();
    }

    async editDetailsOfTimesheet(project,activity){
        await this.projectName.press_sequentially(project);
        await this.page.getByRole('option',{name:project}).click();
        await this.selectActivity.click();
    } 
}