import { test, expect } from '@playwright/test';
import { RegisterPage } from '../Page_Object/RegisterPage';
import   registerDataJson from '../resources/testData.json'
import { TestDataStructure } from '../types/register.types';
import { LoginPage } from '../Page_Object/LoginPage';


test.beforeEach(async ({ page }) => {
    await page.goto('/parabank');
    const loginpage = new LoginPage(page);
    loginpage.login(
        registerDataJson.signingupValidData.username,
        registerDataJson.signingupValidData.password
    )


});

test('Successful User Login', async({page}) => {
    await expect(page).toHaveTitle('ParaBank | Accounts Overview');
});

test('Successful User Logout', async({page}) => {
    const loginpage = new LoginPage(page);
    
    await expect(page).toHaveTitle('ParaBank | Accounts Overview');
    await loginpage.logout();
    await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');





});
