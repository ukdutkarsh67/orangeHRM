const { log } = require("console");

exports.LeavePage=class LeavePage{
    constructor(page){
        this.page=page; 
        this.fromDate=page.getByPlaceholder('yyyy-dd-mm');
        this.toDate=page.getByPlaceholder('yyyy-dd-mm');
        this.showLeave=page.getByText('Select', { exact: true });
        this.selectStatus=page.locator('.oxd-select-option span');
        this.leaveType=page.getByText('-- Select --');
        this.selectLeaveType=page.locator('[class="oxd-select-option"]>span');
        this.subType=page.getByText('-- Select --');
        //page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon');
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
    async LeaveList(){
        await this.fromDate.first().fill('2024-02-02');
        await this.toDate.nth(1).fill('2024-03-03');
        await this.showLeave.click();
        await this.selectStatus.first().click();
        await this.leaveType.first().click();
        await this.page.waitForTimeout(5000);
        const selectLeaveTypeCount=await this.selectLeaveType.count();
        for(let i=0;i<selectLeaveTypeCount;++i){
            const element=await this.selectLeaveType.nth(i);
            const text=await element.textContent();
            if(text==='CAN - FMLA'){
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

            console.log('fuhdfus',subTypeText);
            if(subTypeText==='Engineering'){
                await type.click();
                break;
            }
        }        
    }


    async assignLeaves(nameHint,name){
        await  this.empNameTextbox.fill(nameHint);
        await this.page.waitForTimeout(5000);
        const numberOfSuggestions =await this.empNameSuggestion.count();
 
        for(let i=0; i<numberOfSuggestions; i++){
            //element at ith Index
            const element = await this.empNameSuggestion.nth(i);
            //text of ith element
            const elementText = await element.textContent();
            //click the TargetLink
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

    }
}