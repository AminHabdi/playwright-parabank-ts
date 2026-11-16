import { expect, test } from '@playwright/test'
import { LoginPage } from '../Page_Object/LoginPage'
import { randomUser } from '../utils/generateRandomUser';
import { RegisterPage } from '../Page_Object/RegisterPage';
import registerDataJson from '../resources/testData.json'
import { AccountOverview } from '../Page_Object/AccountOverview'

test.beforeEach(async ({ page }) => {    

    await page.goto('/parabank');
  
    const loginUser = new LoginPage(page);
    await loginUser.login(
        registerDataJson.signingupValidData.username,
        registerDataJson.signingupValidData.password
    );    

});

test('View Accounts Overview', async({ page }) => {
    const viewAccountsOverview = new AccountOverview(page);
    await viewAccountsOverview.waitForPageToLoad();

    await expect(viewAccountsOverview.pageTitle).toBeVisible();
    await expect(viewAccountsOverview.accountsTable).toBeVisible();
    await expect(viewAccountsOverview.totalBalance).toBeVisible();
    
});

