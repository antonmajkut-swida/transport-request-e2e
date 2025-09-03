import { Page } from "@playwright/test"

export class RequestCreatePage {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    ///Waypoints

    async selectTransMode(title: string) {
        await this.page.getByRole('button', { name: (title) }).click();
    }

    async earliestPickupTime(title: string) {
        await this.page.locator('[data-test-id="dp-input"]').first().click();
        await this.page.locator(`[data-test-id="dp-${title}"]`).click();
        await this.page.locator('[data-test-id="select-button"]').click();
    }

    async latestPickupTime(title: string) {
        await this.page.locator('[data-test-id="dp-input"]').nth(1).click();
        await this.page.locator(`[data-test-id="dp-${title}"]`).click();
        await this.page.locator('[data-test-id="select-button"]').click();
    }

    async fillPickupPoint(
        index: number,
        company: string,
        streetNumber: string,
        city: string,
        country: string,
        zip: string,
        contactName: string,
        email: string,
        phone: string
    ) {
        await this.page.locator(`[id="waypoints[${index}].name"]`).fill(company);
        await this.page.locator(`[id="waypoints[${index}].street"]`).fill(streetNumber);
        await this.page.locator(`[id="waypoints[${index}].city"]`).fill(city);

        const countryLocator = `[id="waypoints[${index}].country"]`;
        await this.page.locator(countryLocator).click();
        await this.page.locator(countryLocator).fill(country);
        await this.page.locator(countryLocator).press('Enter');

        await this.page.locator(`[id="waypoints[${index}].postCode"]`).fill(zip);

        const contactNameLocator = (`[id="waypoints[${index}].contactName"]`);
        await this.page.locator(contactNameLocator).fill(contactName);
        await this.page.locator(contactNameLocator).press('Tab');

        const contactEmailLocator = (`[id="waypoints[${index}].contactEmail"]`);
        await this.page.locator(contactEmailLocator).fill(email);
        await this.page.locator(contactEmailLocator).press('Tab');

        const contactPhoneLocator = (`[id="waypoints[${index}].contactPhone"]`);
        await this.page.locator(contactPhoneLocator).fill(phone);
        await this.page.locator(contactPhoneLocator).press('Tab');
    }

    async earliestDeliveryTime(title: string) {
        await this.page.locator('[data-test-id="dp-input"]').nth(2).click();
        await this.page.locator(`[data-test-id="dp-${title}"]`).click();
        await this.page.locator('[data-test-id="select-button"]').click();
    }

    async latestDeliveryTime(title: string) {
        await this.page.locator('[data-test-id="dp-input"]').nth(3).click();
        await this.page.locator(`[data-test-id="dp-${title}"]`).click();
        await this.page.locator('[data-test-id="select-button"]').click();
    }

    async fillDeliveryPoint(
        index: number,
        company: string,
        streetNumber: string,
        city: string,
        country: string,
        zip: string,
        contactName: string,
        email: string,
        phone: string
    ) {
        await this.page.locator(`[id="waypoints[${index}].name"]`).fill(company);
        await this.page.locator(`[id="waypoints[${index}].street"]`).fill(streetNumber);
        await this.page.locator(`[id="waypoints[${index}].city"]`).fill(city);

        const countryLocator = `[id="waypoints[${index}].country"]`;
        await this.page.locator(countryLocator).click();
        await this.page.locator(countryLocator).fill(country);
        await this.page.locator(countryLocator).press('Enter');

        await this.page.locator(`[id="waypoints[${index}].postCode"]`).fill(zip);

        const contactNameLocator = (`[id="waypoints[${index}].contactName"]`);
        await this.page.locator(contactNameLocator).fill(contactName);
        await this.page.locator(contactNameLocator).press('Tab');

        const contactEmailLocator = (`[id="waypoints[${index}].contactEmail"]`);
        await this.page.locator(contactEmailLocator).fill(email);
        await this.page.locator(contactEmailLocator).press('Tab');

        const contactPhoneLocator = (`[id="waypoints[${index}].contactPhone"]`);
        await this.page.locator(contactPhoneLocator).fill(phone);
        await this.page.locator(contactPhoneLocator).press('Tab');
    }

    async continue() {
        await this.page.locator('span', { hasText: 'Continue' }).click();
    }

    ///CargoInfo
    async fillCargoInfo(
        reference: string,
        costCenter: string,
        cargoDesc: string,
        rqrmnts: string,
        lenght: string,
        weight: string,
        note: string
    ) {
        await this.page.getByRole('textbox', { name: 'Reference' }).fill(reference);
        await this.page.getByRole('textbox', { name: 'Cost center' }).fill(costCenter);
        await this.page.getByRole('textbox', { name: 'Cargo description' }).fill(cargoDesc);
        await this.page.getByRole('combobox', { name: 'Special requirements' }).click();
        await this.page.getByText(rqrmnts).click();
        await this.page.locator('[id="cargo.maxLength"]').fill(lenght);
        await this.page.locator('[id="cargo.weight"]').fill(weight);

        await this.page.getByRole('checkbox', { name: 'Add note for carrier' }).check();
        await this.page.getByRole('textbox', { name: 'Note for carrier' }).fill(note);
    }

    ///Carriers
    async fillCarriers(
        carrier: string,
        responsible: string,
        bidding: string
    ) {
        await this.page.getByRole('textbox', { name: 'Search for carrier by name or' }).click();
        await this.page.getByText(carrier).click();
        await this.page.getByRole('combobox', { name: 'Responsible person' }).fill(responsible);
        await this.page.getByRole('radio', { name: 'Custom' }).check();
        await this.page.getByRole('spinbutton', { name: 'Hours' }).click();
        await this.page.getByRole('spinbutton', { name: 'Hours' }).fill(bidding);
    }

    async fillCarriersDisabled(
        responsible: string,
        bidding: string
    ) {
        await this.page.getByRole('combobox', { name: 'Responsible person' }).fill(responsible);
        await this.page.getByRole('radio', { name: 'Custom' }).check();
        await this.page.getByRole('spinbutton', { name: 'Hours' }).click();
        await this.page.getByRole('spinbutton', { name: 'Hours' }).fill(bidding);
    }
}