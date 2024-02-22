import {test,expect} from '@playwright/test';
import logindata from '../test-data/logindata.json';
import {LoginPage} from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LeavePage } from '../pages/LeavePage';
test.describe('Dashboard Page',()=>{
    let page;
    let context;
    let login;
    let dashboard;
    let leave;
    test.beforeAll('Initialize',async({browser})=>{
        context=await browser.newContext();
        page=await context.newPage();
        login=new LoginPage(page);
        dashboard=new DashboardPage(page);
        leave=new LeavePage(page);
    })
    test.beforeEach(async ()=>{
        await login.goToLogin();
        await login.fillUserName(logindata[0].username);
        await login.fillPassword(logindata[0].password);
        await login.clickLoginButton();
    })
    test('test LeaveList Functionality',async ()=>{
        await dashboard.clickOnPageLink('Leave');
        await leave.LeaveList('2024-02-10','2024-02-18','Ab','Abdul','Annual Leave - AL','Administration');
    })

    test('test AssignLeave Functionality',async ()=>{
        await dashboard.clickOnPageLink('Leave');
        await leave.ClickSubLeavePageLink('Assign Leave');
        await leave.assignLeaves('Ad','Adarsh','Annual Leave - AL','2024-02-10','2024-02-18','delay');
    })

    
})
