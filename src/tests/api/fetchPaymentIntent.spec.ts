import { test, expect } from '@playwright/test';
import * as apiController from '../../api/apiController';
import { PaymentIntentStatus, ApiErrorStates } from '../../utils/constants';

const PAYMENT_INTENT_ID = 'a5efc3d2-4d7e-40c1-a24f-f07633fcc9aa';

test.describe('Fetch Payment Intent API', () => {

  // Expected properties and their types
  const expectedProperties = {
    id: 'string',
    account_id: 'string',
    amount: 'number',
    currency_code: 'string',
    created_at: 'string',
    status: 'string',
    operation_id: 'string',
    redirect_url: 'string',
    success_url: 'string | null',
    cancel_url: 'string | null'
  };

  test('should fetch a payment intent successfully', async ({request}) => {
    const response = await apiController.fetchPaymentIntent(request, PAYMENT_INTENT_ID);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    // Check for all properties and their types
    for (const [key, type] of Object.entries(expectedProperties)) {
      expect(responseBody).toHaveProperty(key);
      if (type !== 'string | null') {
        expect(typeof responseBody[key]).toBe(type);
      } else {
        expect(typeof responseBody[key] === 'string' || responseBody[key] === null).toBeTruthy();
      }
    }

    // Check if the status is one of the valid statuses
    const validStatuses = Object.values(PaymentIntentStatus);
    expect(validStatuses).toContain(responseBody.status);
  });

  test('should handle non-existent payment intent', async ({request}) => {
    const nonExistentId = '000';
    const response = await apiController.fetchPaymentIntent(request, nonExistentId);
    
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    expect(responseBody).toEqual({
      code: ApiErrorStates.PAYMENT_INTENT_NOT_FOUND.code,
      message: ApiErrorStates.PAYMENT_INTENT_NOT_FOUND.message
    });
  });

});
