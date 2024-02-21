import {test,expect} from '@playwright/test';
import logindata from '../test-data/logindata.json';
import {LoginPage} from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
test.describe('Dashboard Page',()=>{
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
    test('click links',async ()=>{
        await dashboard.clickOnPageLink('PIM');
        await dashboard.verifyNavPage('PIM');
    })
})