import {test,expect} from '@playwright/test';
import logindata from '../test-data/logindata.json';
import {LoginPage} from '../pages/LoginPage';
//const logindata=require('../test-data/logindata.json');

test.describe('check login functionality',()=>{
    let page;
    let context;
    let login;
    test.beforeAll('Initialize',async({browser})=>{
        context=await browser.newContext();
        page=await context.newPage();
        login=new LoginPage(page);
    })
    
    test.beforeEach(async ()=>{
        await login.goToLogin();
    })

    test('Verify that the login functionality in OrangeHM with valid data',async ()=>{
        await login.fillUserName(logindata[0].username);
        await login.fillPassword(logindata[0].password);
        await login.clickLoginButton();
        await login.verifyUserSuccessfulLoginMessage();
    });
    
    test('Verify that the login functionality in OrangeHM with invalid data',async ()=>{
        
        await login.fillUserName(logindata[1].username);
        await login.fillPassword(logindata[1].password);
        await login.clickLoginButton();
        await login.verifyErrorMessageForInvalidData();
    });
    
    test('Verify that the login functionality in OrangeHM with blank data',async ()=>{
        await login.clickLoginButton();
        await login.verifyErrorMessageForBlankData();
    });

})
