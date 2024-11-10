import { test } from '@playwright/test';
import { PopupPage } from './page/popup';

let page;
let popupPage;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();

  page = await context.newPage();

  popupPage = new PopupPage(page);

  await popupPage.gotoPage('https://play1.automationcamp.ir/multi_window.html');
});

test('@popup open new window 1', async () => {
  await popupPage.newWindowOne();
});

test('@popup open new window 2', async () => {
  await popupPage.newWindowTwo();
});