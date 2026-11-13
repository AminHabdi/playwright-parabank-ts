import { test, expect } from '@playwright/test';
import { RegisterPage } from '../Page_Object/RegisterPage';
import   registerData from '../resources/testData.json'

test.beforeEach(async ({ page }) => {
    await page.goto('/parabank');
})
test('Registration of a user', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.clickRegisterLink();
    await expect(page).toHaveURL('/parabank/register.htm');

    await expect(registerPage.firstnameInput).toBeVisible();

    await registerPage.fillRegistrationForm(registerData.signingupValidData);
    await registerPage.submitRegistration();

    await expect(page.locator('#rightPanel')).toContainText('Your account was created');
});