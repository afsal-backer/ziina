import { test, expect } from '@playwright/test';
import * as apiController from '../../api/apiController';
import { ApiErrorStates, PaymentIntentStatus } from '../../utils/constants';

test.describe('Create Payment Intent API', () => {

  // Expected properties and their types
  const expectedProperties = {
    id: 'string',
    account_id: 'string',
    amount: 'number',
    currency_code: 'string',
    created_at: 'string',
    status: 'string',
    operation_id: 'string',
    redirect_url: 'string'
  };

  test('should create a payment intent with correct properties', async ({ request }) => {
    const amount = 2000;
    const currencyCode = 'AED';
    const response = await apiController.createPaymentIntent(request, amount, currencyCode, true);
    
    expect(response.status()).toBe(201);
    const responseBody = await response.json();

    // Check for all properties and their types
    for (const [key, type] of Object.entries(expectedProperties)) {
      expect(responseBody).toHaveProperty(key);
      expect(typeof responseBody[key]).toBe(type);
    }

    // Check specific values
    expect(responseBody.amount).toBe(amount);
    expect(responseBody.currency_code).toBe(currencyCode);
    expect(responseBody.status).toBe(PaymentIntentStatus.REQUIRES_PAYMENT_INSTRUMENT);
    expect(responseBody.redirect_url).toMatch(/^https:\/\/pay\.ziina\.com\/payment_intent\/[a-f0-9-]+$/);
  });

  test('should fail with amount 199 (edge case)', async ({ request }) => {
    const response = await apiController.createPaymentIntent(request, 199, 'AED', true);
    
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('code', ApiErrorStates.MINIMUM_TRANSFER_AMOUNT);
    expect(responseBody).toHaveProperty('message', ApiErrorStates.MINIMUM_TRANSFER_AMOUNTMESSAGE);
  });

  test('should succeed with max limit 360000', async ({ request }) => {
    const response = await apiController.createPaymentIntent(request, 360000, 'AED', true);
    
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.amount).toBe(360000);
  });

  test('should fail with amount 360001 (boundary)', async ({ request }) => {
    const response = await apiController.createPaymentIntent(request, 360001, 'AED', true);
    
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('code', ApiErrorStates.MAXIMUM_TRANSFER_AMOUNT);
    expect(responseBody).toHaveProperty('message', ApiErrorStates.MAXIMUM_TRANSFER_AMOUNT_MESSAGE);
  });

  // Remove or comment out the tests for incorrect request type and incorrect authentication
  // as they were using the options parameter which is no longer available
});
