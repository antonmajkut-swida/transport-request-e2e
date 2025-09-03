import { Page } from "@playwright/test"

export class LoginPage {
    private page: Page
    private usernameInput = "//input[@name='email']"
    private passwordInput = "//input[@name='password']"
    private submit = ('button[type="submit"]')    

    constructor(page: Page) {
        this.page = page
    }

    async logIn() {
        await this.page.fill(this.usernameInput, process.env.TRANSPORT_USER!)        
        await this.page.fill(this.passwordInput, process.env.TRANSPORT_PASS!)
        await this.page.click(this.submit)
    }
}