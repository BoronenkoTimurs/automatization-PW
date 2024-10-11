import { BasePage } from "../../pages/base";
import { expect } from '@playwright/test';

export class PopupPage extends BasePage{
  constructor(page) {
    super(page);

    this.popupPromise = this.page.waitForEvent('popup');
  };

  async testNewWindow(windowSelector, btnSelector, expectedText) {
    const openWindowBtn = this.page.locator(windowSelector);

    const [newWindow] = await Promise.all([
      this.page.waitForEvent('popup'),
      openWindowBtn.click(), 
    ]);

    const clickMeBtn = await newWindow.locator(btnSelector);

    await clickMeBtn.click();

    const btnTextReceived = await clickMeBtn.textContent();

    expect(btnTextReceived).toBe(expectedText);
  };

  async newWindowOne() {
    await this.testNewWindow('#window1', '#click_me_2', "Clicked");
  };
  
  async newWindowTwo() {
    await this.testNewWindow('#window2', '#click_me_4', "Clicked");
  };
};