import { test, expect } from "@playwright/test";

test("walletConnect", async ({ page }) => {
  test.setTimeout(120000);
  await page.goto("/");

  // Test Pera Wallet
  await page.getByLabel("Connect Wallet").hover();
  await page.getByLabel("Connect Pera Wallet").click();
  await expect(page.getByText("Pera Connect")).toHaveText(/.+/);
  await page.locator("#pera-wallet-modal-header-close-button").click();

  // Test Defly Wallet
  await page.getByLabel("Connect Wallet").hover();
  await page.getByLabel("Connect Defly Wallet").click();
  await expect(page.getByText("Defly Connect")).toHaveText(/.+/);
  await page.locator("#defly-wallet-modal-header-close-button").click();

  // Test Daffi Wallet
  await page.getByLabel("Connect Wallet").hover();
  await page.getByLabel("Connect Daffi Wallet").click();
  await expect(page.getByText("DaffiWallet Connect")).toHaveText(/.+/);
  await page.locator("#daffi-wallet-modal-header-close-button").click();
});
