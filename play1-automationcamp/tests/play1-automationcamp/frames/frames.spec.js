import { test } from '@playwright/test';
import { FramesPage } from './page/frames';

let page;
let framesPage;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();

  page = await context.newPage();

  framesPage = new FramesPage(page);

  await framesPage.gotoPage('https://play1.automationcamp.ir/frames.html');
});

test('@frames click on different frames buttons', async () => {
  await framesPage.clickFirstFrame();
  await framesPage.clickSecondFrame();
  await framesPage.clickFourthFrame();
});