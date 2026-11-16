import { test, expect } from '@playwright/test';
import { RegisterPage } from '../Page_Object/RegisterPage';
import registerDataJson from '../resources/testData.json'
import { TestDataStructure } from '../types/register.types';
import { LoginPage } from '../Page_Object/LoginPage';
import { randomUser } from '../utils/generateRandomUser';

//let currentUser: any;

test.beforeEach(async ({ page }) => {
    await page.goto('/parabank');
});

test('Successful User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
        registerDataJson.signingupValidData.username,
        registerDataJson.signingupValidData.password
    );
    await expect(page).toHaveTitle('ParaBank | Accounts Overview');
});

test('Successful User Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
        registerDataJson.signingupValidData.username,
        registerDataJson.signingupValidData.password
    );

    await expect(page).toHaveTitle('ParaBank | Accounts Overview');
    await loginPage.logout();
    await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');

});



