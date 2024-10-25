import { expect, Page } from '@playwright/test';
import { PAYMENT_DETAILS } from '../utils/constants';

// locators
const cardIFrame = (page: Page) => page.locator('iframe[title="Secure text input frame"]').contentFrame();
const cardNumberIFrame = (page: Page) => page.locator('iframe[title="Secure card number input frame"]').contentFrame();
const expiryDateIFrame = (page: Page) => page.locator('iframe[title="Secure card expiration date input frame"]').contentFrame();
const cvvIFrame = (page: Page) => page.locator('iframe[name="vgs-collect-cvv-field"]').contentFrame();
const emailInput = (page: Page) => page.getByTestId('emailTextField');
const cardHolderNameInput = (page: Page) => cardIFrame(page).locator('//input[@aria-label="cardholder text field"]');
const cardNumberInput = (page: Page) => cardNumberIFrame(page).locator('//input[@aria-label="card number text field"]');
const expiryDateInput = (page: Page) => expiryDateIFrame(page).getByLabel('card expiration date text');
const cvvInput = (page: Page) => cvvIFrame(page).getByLabel('card security code text field');
const payButton = (page: Page) => page.getByTestId('payButton');
const paidToText = (page: Page, username: string) => page.getByText(`Paid to ${username}`);
const amountText = (page: Page, amount: string) => page.getByText(`AED ${amount}`);


// actions

export async function navigateToPaymentPage(page: Page) {
    await page.goto('https://pay.ziina.com/payment_intent/7344c05f-110c-4d24-ac11-bf68f95dd865');
}

export async function getTitle(page: Page) {
    return await page.title();
  }

export async function fillPaymentDetails(page: Page) {
    await emailInput(page).fill(PAYMENT_DETAILS.EMAIL);
    await cardHolderNameInput(page).fill(PAYMENT_DETAILS.CARD_HOLDER_NAME);
    await cardNumberInput(page).fill(PAYMENT_DETAILS.CARD_NUMBER);
    await expiryDateInput(page).fill(PAYMENT_DETAILS.EXPIRY_DATE);
    await cvvInput(page).fill(PAYMENT_DETAILS.CVV);
  }

export async function clickPayButton(page: Page) {
    await payButton(page).click();
  }

  //asserts

export async function verifyPaymentDetails(page: Page, username: string, amount: string) {
    await expect(paidToText(page, username).nth(0)).toBeVisible();
    await expect(amountText(page, amount).nth(0)).toBeVisible();
    await expect(amountText(page, amount).nth(0)).toBeVisible();
}
