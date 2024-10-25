import { APIRequestContext, Page, expect } from '@playwright/test';
import { createPaymentIntent } from '../api/apiController';
import * as paymentPage from '../pages/PaymentPage';

export async function setupPaymentPage(request: APIRequestContext, page: Page, amount: number, currencyCode: string) {
  const createResponse = await createPaymentIntent(request, amount, currencyCode, true);
  
  expect(createResponse.status()).toBe(201);
  const createResponseBody = await createResponse.json();
  expect(createResponseBody).toHaveProperty('redirect_url');
  
  const paymentIntentId = createResponseBody.id;
  const redirectUrl = createResponseBody.redirect_url;

  await page.goto(redirectUrl);
  const title = await paymentPage.getTitle(page);
  expect(title).toBe('Ziina | Send and Receive Cash. Fast');

  return { paymentIntentId, redirectUrl };
}
