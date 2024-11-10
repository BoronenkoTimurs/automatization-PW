import { test } from '@playwright/test';
import { KeyboardPage } from './pages/keyboard';

let page;
let keyboardPage;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();

  page = await context.newPage();

  keyboardPage = new KeyboardPage(page);

  await keyboardPage.gotoPage('https://play1.automationcamp.ir/keyboard_events.html');
});

test('@keyboard write text in area', async () => {
  await keyboardPage.writeTextWithDelay();
  await keyboardPage.clickSpecialKeys();
});