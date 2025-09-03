import { expect } from '@playwright/test';
import { transportRqstTest } from '../Hooks/base';
import { RequestListPage } from '../4Shipper/RequestListPage';
import { RequestCreatePage } from '../4Shipper/RequestCreatePage';

transportRqstTest('Negative-Missing mandatory fields', async ({ page }) => {

  ///Select New Request
  const requestListPage = new RequestListPage(page);
  await requestListPage.clickOnNewRequest();

  ///Waypoints
  //Create Request-Pickup Waypoint    
  const requestCreatePage = new RequestCreatePage(page);
  await requestCreatePage.selectTransMode('Road');
  await requestCreatePage.continue();

  ///Assert Mandatory
  const deliveryPointIndex = 1
  await expect(page.getByText('This field is required.').first()).toBeVisible();
  await expect(page.getByText('This field is required.').nth(deliveryPointIndex)).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Waypoints !' })).toBeVisible();
});