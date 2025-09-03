import { expect } from '@playwright/test';
import { transportRqstTest } from '../Hooks/base';
import { RequestListPage } from '../4Shipper/RequestListPage';
import { RequestCreatePage } from '../4Shipper/RequestCreatePage';

transportRqstTest('Happy path: create a valid Transport Request', async ({ page }) => {

    ///Select New Request
    const requestListPage = new RequestListPage(page);
    await requestListPage.clickOnNewRequest();

    ///Waypoints
    //Create Request-Pickup Waypoint    
    const requestCreatePage = new RequestCreatePage(page);
    await requestCreatePage.selectTransMode('Sea');
    const pickupPointIndex = 0

    await requestCreatePage.earliestPickupTime('2025-09-20');
    await requestCreatePage.latestPickupTime('2025-09-25');

    await requestCreatePage.fillPickupPoint(
        pickupPointIndex,
        "Mrkva ltd",
        "Mrkva 007",
        "Mrkvovo",
        "Slovakia",
        "007007",
        "Jozko Mrkvicka",
        "mrkva@007.com",
        "+421911111111"
    );

    //Create Request-Delivery Waypoint    
    const deliveryPointIndex = 1
    await requestCreatePage.earliestDeliveryTime('2025-09-29');
    await requestCreatePage.latestDeliveryTime('2025-09-30');

    await requestCreatePage.fillDeliveryPoint(
        deliveryPointIndex,
        "Mrkva ltd",
        "Mrkva 007",
        "Mrkvovo",
        "Slovakia",
        "007007",
        "Jozko Mrkvicka",
        "mrkva@007.com",
        "+421911111111"
    );

    await requestCreatePage.continue();

    //Assert Waypoints
    await expect(page.getByRole('heading', { name: 'Cargo details' })).toBeEnabled();
    await expect(page.getByRole('img').nth(3)).toBeVisible();

    ///Cargo Info
    await requestCreatePage.fillCargoInfo(
        "Transport",
        "MrkvaCC",
        "Heavy",
        "Handling from Top",
        "150",
        "250",
        "Fragile"
    );

    await requestCreatePage.continue();

    //Assert CargoInfo
    await expect(page.getByRole('heading', { name: 'Cargo information' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Route waypoints' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Carriers' })).toBeEnabled();

    ///Carriers
    await requestCreatePage.fillCarriers(
        "Demo carrier",
        "Jozko Mrkvicka",
        "5"
    );

    await requestCreatePage.continue();

    ///Assert Review
    await expect(page.getByRole('heading', { name: 'Check and confirm your request' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Review' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Route waypoints' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cargo information' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Carriers', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: ' Save without sending' })).toBeEnabled();
    await expect(page.getByRole('button', { name: ' Send request' })).toBeEnabled();

    ///Send Request
    await (page.getByRole('button', { name: ' Send request' })).click();
});