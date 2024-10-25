export const PaymentIntentStatus = {
  REQUIRES_PAYMENT_INSTRUMENT: 'requires_payment_instrument',
  PENDING: 'pending',
  REQUIRES_USER_ACTION: 'requires_user_action',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export const ApiEndpoints = {
  PAYMENT_INTENT: '/api/payment_intent'
};

export const ApiErrorStates = {
  MINIMUM_TRANSFER_AMOUNT: 'TRANSFER_UNDER_MINIMUM',
  MAXIMUM_TRANSFER_AMOUNT: 'TRANSFER_EXCEEDS_LIMIT',
  MAXIMUM_TRANSFER_AMOUNT_MESSAGE: 'Transfers can be at most AED3,600. Please try again with a smaller amount.',
  MINIMUM_TRANSFER_AMOUNTMESSAGE: 'Transfers must be at least AED2. Please try again with a larger amount.',
  INCORRECT_REQUEST_TYPE: 'Bad Request',
  INCORRECT_REQUEST_TYPE_MESSAGE: [
    "amount must be a number conforming to the specified constraints",
    "currency_code must be longer than or equal to 3 characters"
  ],
  UNAUTHORIZED: {
    message: "Unauthorized",
    statusCode: 401
  },
  PAYMENT_INTENT_NOT_FOUND: {
    code: 'PAYMENT_INTENT_NOT_FOUND',
    message: 'The payment was not found. Please try a different payment'
  }
};

// Payment details
export const PAYMENT_DETAILS = {
    EMAIL: 'test@test.com',
    CARD_HOLDER_NAME: 'andre vod',
    CARD_NUMBER: '4242424242424242',
    EXPIRY_DATE: '12/24',
    CVV: '123'
};
