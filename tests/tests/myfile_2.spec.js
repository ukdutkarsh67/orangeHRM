const {test,expect}=require('@playwright/test');

test('test',async ({browser})=>{
    const context=await browser.newContext();
    const page2=await context.newPage();
    await page2.goto('https://google.com/');
})