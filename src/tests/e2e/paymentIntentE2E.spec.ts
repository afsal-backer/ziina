import { test, expect } from '@playwright/test';
import { createPaymentIntent, fetchPaymentIntent } from '../../api/apiController';
import { PaymentIntentStatus } from '../../utils/constants';
import { fillPaymentDetails, clickPayButton, verifyPaymentDetails } from '../../pages/PaymentPage';

test.describe('Payment Intent E2E Flow', () => {
  test('Create payment intent, complete payment, and verify status', async ({ page, request }) => {
    
    // Step 1: Create Payment Intent
    const amount = 2000;
    const currencyCode = 'AED';

    const createResponse = await createPaymentIntent(request, amount, currencyCode, true);
    expect(createResponse.status()).toBe(201);
    const createResponseBody = await createResponse.json();
    expect(createResponseBody).toHaveProperty('redirect_url');
    const paymentIntentId = createResponseBody.id;

    // Step 2: Navigate to Payment Page and Complete Payment, Assert confirmation page
    await page.goto(createResponseBody.redirect_url);
    await fillPaymentDetails(page);
    await clickPayButton(page);
    const displayAmount = (amount / 100).toFixed(2);  // Convert amount to the format displayed on the page (20.00 instead of 2000)
    await verifyPaymentDetails(page, 'andre.vod', displayAmount);

    // Step 3: Fetch Payment Intent and Verify Status
    const fetchResponse = await fetchPaymentIntent(request, paymentIntentId);
    expect(fetchResponse.status()).toBe(200);
    const fetchResponseBody = await fetchResponse.json();
    expect(fetchResponseBody).toHaveProperty('status', PaymentIntentStatus.COMPLETED);
  });
});
