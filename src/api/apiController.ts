import { APIRequestContext } from '@playwright/test';
import { ApiEndpoints } from '../utils/constants';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.API_BASE_URL || 'https://api-v2.ziina.com';
const token = process.env.API_TOKEN || '';

if (!token) {
  throw new Error('API token is not set. Please check your .env file.');
}

export async function createPaymentIntent(request: APIRequestContext, amount: number, currencyCode: string, test: boolean) {
  const response = await request.post(`${baseUrl}${ApiEndpoints.PAYMENT_INTENT}`, {
    data: {
      currency_code: currencyCode,
      amount: amount,
      test: test,
    },
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response;
}

export async function fetchPaymentIntent(request: APIRequestContext, paymentIntentId: string) {
  const url = `${baseUrl}${ApiEndpoints.PAYMENT_INTENT}/${paymentIntentId}`;
  
  return request.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
