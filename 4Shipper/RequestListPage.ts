import { Page } from "@playwright/test"

export class RequestListPage {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickOnNewRequest() {
        await this.page.getByRole('link', { name: '+ New request' }).click();
    }
}