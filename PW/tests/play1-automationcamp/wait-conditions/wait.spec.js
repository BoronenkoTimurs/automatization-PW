import { WaitPage } from './pages/wait';
import { test } from '@playwright/test';

let waitPage;
let page;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();

  page = await context.newPage();
  page.on('dialog', (alert) => {
    alert.type()
  });

  waitPage = new WaitPage(page);

  await waitPage.gotoPage('https://play1.automationcamp.ir/expected_conditions.html');
});

test('@wait wait for alert to be present', async () => {
  await waitPage.waitAlert();

  await waitPage.waitPrompt();
});

test('@wait wait for element to be visible', async () => {
  await waitPage.waitTriggerVisible();
});

test('@wait wait for element to be invisible', async () => {
  await waitPage.waitTriggerInvisible();
});

test('@wait wait for element to be enabled', async () => {
  await waitPage.waitEnabled();
});

test('@wait wait for text/value to have specific values', async () => {
  await waitPage.waitSpecificValues();
});

test('@wait wait for frame to be available and then switch to it', async () => {
  await waitPage.waitFrame();
});



