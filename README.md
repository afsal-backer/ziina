# Ziina API and UI Test Automation Framework

This project is a test automation framework using Playwright for API and UI testing of a payment system.

## Test Cases

For a detailed list of test cases, please refer to the [test-cases](./test-cases) file.

## Project Structure

```src/
├── api/
│   └── apiController.ts
├── pages/
│   └── PaymentPage.ts
├── tests/
│   ├── api/
│   │   ├── createPaymentIntent.spec.ts
│   │   └── fetchPaymentIntent.spec.ts
│   ├── e2e/
│   │   └── paymentIntentE2E.spec.ts
│   ├── ui/
│   │   └── paymentPageUI.spec.ts
│   └── testHelper.ts
└── utils/
    └── constants.ts
```

## Setup

1. Clone the repository
2. Install dependencies:

   ```npm install
   ```

3. Set up environment variables:
   Modify the `.env` file in the root directory and add the API token

## Running Tests

You can run tests using the following npm scripts:

- Run all tests:

  ```npm test
  ```

- Run API tests only:

  ```npm run test:api
  ```

- Run UI tests only:

  ```npm run test:ui
  ```

- Run E2E tests only:

  ```npm run test:e2e
  ```
  