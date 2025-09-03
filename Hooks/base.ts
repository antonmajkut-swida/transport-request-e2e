import { test as base } from '@playwright/test';
import { LoginPage } from '../4Shipper/Login';

const test = base;

test.beforeEach(async ({ page }) => {
  
await page.goto('https://stage.4shipper.transportly.eu');
});

// Login user
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.logIn();
});

export { test as transportRqstTest };