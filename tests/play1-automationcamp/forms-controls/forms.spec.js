import { test } from '@playwright/test';
import { FormsPage } from './page/forms';

let page;
let formsPage;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();

  page = await context.newPage();

  formsPage = new FormsPage(page);

  await formsPage.gotoPage('https://play1.automationcamp.ir/forms.html');
});

test('@forms basic form controls', async () => {
  await formsPage.fillForm();
});