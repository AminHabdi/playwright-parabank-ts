import { test, expect } from '@playwright/test';
import { RegisterPage } from '../Page_Object/RegisterPage';
import { LoginPage } from '../Page_Object/LoginPage';
import registerDataJson from '../resources/testData.json'

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
    await page.goto('/parabank');

    const registerPage = new RegisterPage(page);
    await registerPage.clickRegisterLink();

    const uniqueUseData = {
        ...registerDataJson.signingupValidData,
        username: `user_${Math.floor(Math.random() * 10000000)}`
    };
    await registerPage.fillRegistrationForm(uniqueUseData);
    await registerPage.submitRegistration();

    const loginPage = new LoginPage(page);
    await loginPage.logout();
});

test('Successful User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(registerDataJson.signingupValidData.username,
        registerDataJson.signingupValidData.password);
    await expect(page).toHaveTitle('ParaBank | Accounts Overview');
});

test('Successful User Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(registerDataJson.signingupValidData.username,
        registerDataJson.signingupValidData.password);
    await expect(page).toHaveTitle('ParaBank | Accounts Overview'); await expect(page).toHaveTitle('ParaBank | Accounts Overview');
    await loginPage.logout();
    await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
});