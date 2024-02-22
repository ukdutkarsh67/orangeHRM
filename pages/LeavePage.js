const { log } = require("console");

exports.LeavePage=class LeavePage{
    constructor(page){
        this.page=page; 
        this.subleavePageLink=page.locator('[class="oxd-topbar-body-nav-tab-item"]');
        this.fromDate=page.getByPlaceholder('yyyy-dd-mm');
        this.toDate=page.getByPlaceholder('yyyy-dd-mm');
        this.showLeave=page.getByText('Select', { exact: true });
        this.selectStatus=page.locator('.oxd-select-option span');
        this.leaveType=page.getByText('-- Select --');
        this.selectLeaveType=page.locator('[class="oxd-select-option"]>span');
        this.subType=page.getByText('-- Select --');
        this.selectSubType=page.locator('[class*="oxd-select-option"]>span');
        this.empNameTextbox= page.getByPlaceholder('Type for hints...');
        this.empNameSuggestion= page.locator('[class="oxd-autocomplete-option"]>span')
        this.leaveTypeDropDown= page.locator('[class="oxd-select-option"]>span');
        this.leaveType=page.getByText('-- Select --');
        this.fromDateCalendar =page.getByPlaceholder('yyyy-dd-mm').first()
        this.toDateCalendar= page.getByPlaceholder('yyyy-dd-mm').nth(1);
        this.commentTextbox= page.locator('.oxd-input-group textarea');
        this.assignButton=page.getByText(' Apply ')

    }
    async ClickSubLeavePageLink(subLeavePage){
        const subPageCount=await this.subleavePageLink.count();
        for(let i=0;i<subPageCount;i++){
            if(this.subleavePageLink.nth(i).textContent===subLeavePage){
                this.subleavePageLink.nth(i).click();
                break;
            }
        }
    }
    async LeaveList(fromDate,toDate,nameHint,name,leavetype,subtype){
        await this.fromDate.first().fill(fromDate);
        await this.toDate.nth(1).fill(toDate);
        await this.showLeave.click();
        await this.selectStatus.first().click();
        await this.leaveType.first().click();
        await this.page.waitForTimeout(5000);
        const selectLeaveTypeCount=await this.selectLeaveType.count();
        for(let i=0;i<selectLeaveTypeCount;++i){
            const element=await this.selectLeaveType.nth(i);
            const text=await element.textContent();
            if(text===leavetype){
                await element.click();
                break;
            }
        }

        await this.subType.last().click();
        await this.page.waitForTimeout(5000);
        const selectSubTypeCount=await this.selectSubType.count();
        console.log('cou',selectSubTypeCount);
        console.log(await this.selectSubType.nth(1).textContent());
        for(let i=0;i<selectSubTypeCount;++i){
            const type=await this.selectLeaveType.nth(i);
            const subTypeText=await type.textContent();
            if(subTypeText===subtype){
                await type.click();
                break;
            }
        }        
    }


    async assignLeaves(nameHint,name,leavetype,fromDate,toDate,comment){
        await  this.empNameTextbox.fill(nameHint);
        await this.page.waitForTimeout(5000);
        const numberOfSuggestions =await this.empNameSuggestion.count();
 
        for(let i=0; i<numberOfSuggestions; i++){
            const element = await this.empNameSuggestion.nth(i);
            const elementText = await element.textContent();
            if(elementText.includes(name)){
                await element.click();
                break;
            }
        }
        await this.leaveType.click();
        await this.page.waitForTimeout(3000);
        const numberOfSuggestion =await this.leaveTypeDropDown.count();
        for(let i=0; i<numberOfSuggestion; i++){
            const element = await this.leaveTypeDropDown.nth(i);
            const elementText = await element.textContent();
            if(elementText=== leavetype){
                await element.click();
                break;
            }
        }
        await this.fromDateCalendar.fill(fromDate);
        await this.toDateCalendar.press('Control+a');
        await this.toDateCalendar.fill(toDate);
        await this.commentTextbox.fill(comment);
        await this.assignButton.click();

    }
}