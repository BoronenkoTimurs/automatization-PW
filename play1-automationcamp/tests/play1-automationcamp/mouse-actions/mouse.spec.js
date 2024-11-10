import { test } from '@playwright/test';
import { MousePage } from './pages/mouse';

let page;
let mousePage;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();

  page = await context.newPage();

  mousePage = new MousePage(page);

  await mousePage.gotoPage('https://play1.automationcamp.ir/mouse_events.html');
});

test('@mouse mouse click actions', async () => {
  await mousePage.clickOnArea();
});

test('@mouse mouse hover', async () => {
  await mousePage.mouseHover();
});

test('@mouse drag and drop', async () => {
  await mousePage.dragAndDrop();
});