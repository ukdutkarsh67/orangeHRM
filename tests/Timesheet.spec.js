import {test,expect} from '@playwright/test';
import logindata from '../test-data/logindata.json';
import {LoginPage} from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import {TimesheetPage} from '../pages/TimesheetPage';
test.describe('TimeSheet Page',()=>{
    let page;
    let context;
    let login;
    let dashboard;
    test.beforeAll('Initialize',async({browser})=>{
        context=await browser.newContext();
        page=await context.newPage();
        login=new LoginPage(page);
        dashboard=new DashboardPage(page);
    })
    test.beforeEach(async ()=>{
        await login.goToLogin();
        await login.fillUserName(logindata[0].username);
        await login.fillPassword(logindata[0].password);
        await login.clickLoginButton();
    })
    test('view timesheet',async ()=>{
        const timesheet=new TimesheetPage(page);
        await dashboard.clickOnPageLink('Time');
        await timesheet.clickViewTimesheet();
    })

    test('edit timesheet',async ()=>{
        const timesheet=new TimesheetPage(page);
        await dashboard.clickOnPageLink('Time');
        await timesheet.clickViewTimesheet();
        await timesheet.clickEditTimesheet();
        await timesheet.editDetailsOfTimesheet('ACME Ltd - ACME Ltd','Bug Fixes');
    })
})