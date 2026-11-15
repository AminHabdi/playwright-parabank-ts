import { test, expect } from '@playwright/test';
import { RegisterPage } from '../Page_Object/RegisterPage';
import registerDataJson from '../resources/testData.json'
import { TestDataStructure } from '../types/register.types';
import { LoginPage } from '../Page_Object/LoginPage';


test.beforeEach(async ({ page }) => {
    await page.goto('/parabank');

    const uniqueUsername = `user_${Math.floor(Math.random() * 10000000)}`;
    const registerPage = new RegisterPage(page);
    await registerPage.clickRegisterLink();

    const user = {
        ...registerDataJson.signingupValidData,
        username: uniqueUsername
    };

    await registerPage.fillRegistrationForm(user);
    await registerPage.submitRegistration();

    const loginPage = new LoginPage(page);
    await loginPage.logout();



    test('Successful User Login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(
            uniqueUsername,
            registerDataJson.signingupValidData.password
        );
        await expect(page).toHaveTitle('ParaBank | Accounts Overview');
    });

    test('Successful User Logout', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(
            uniqueUsername,
            registerDataJson.signingupValidData.password
        );

        await expect(page).toHaveTitle('ParaBank | Accounts Overview');
        await loginPage.logout();
        await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');

    });

});

