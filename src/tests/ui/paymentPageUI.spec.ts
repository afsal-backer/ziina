import { test, expect } from '@playwright/test';
import * as paymentPage from '../../pages/PaymentPage';
import { setupPaymentPage } from '../testHelper';

test.describe('Payment Page UI Test', () => {
  let paymentIntentId: string;
  let redirectUrl: string;

  const amount = 3600; // 36.00 AED
  const currencyCode = 'AED';

  test.beforeEach(async ({ page, request }) => {
    
    ({ paymentIntentId, redirectUrl } = await setupPaymentPage(request, page, amount, currencyCode));
  });

  test('user can enter payment details and submit, then verify payment confirmation', async ({ page }) => {
    const username = 'andre.vod';
    await paymentPage.fillPaymentDetails(page);
    await paymentPage.clickPayButton(page);
    const displayAmount = (amount / 100).toFixed(2);
    await paymentPage.verifyPaymentDetails(page, username, displayAmount);
  });
});
