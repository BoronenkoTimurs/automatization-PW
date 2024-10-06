import { expect } from '@playwright/test';
import { BasePage } from "../../pages/base";

export class KeyboardPage extends BasePage {
  constructor(page) {
    super(page);

    this.area = this.page.locator('#area');
    this.key = this.page.locator('#key');
    this.code = this.page.locator('#code');
  };

  async writeTextWithDelay() {
    await this.area.click();

    await this.page.keyboard.type('Hello World!', { delay: 100 });
  };

  async clickSpecialKeys() {
    const arrowLeft = 'ArrowLeft';
    const metaRight = 'MetaRight';
    const metaLeft = 'MetaRight';

    await this.area.click();

    await this.page.keyboard.press(arrowLeft);
    await expect(this.key).toHaveText(arrowLeft);
    await expect(this.code).toHaveText(arrowLeft);
    
    await this.page.keyboard.press(metaRight);
    await expect(this.key).toHaveText('Meta');
    await expect(this.code).toHaveText(metaRight);
    
    await this.page.keyboard.press(metaLeft);
    await expect(this.key).toHaveText('Meta');
    await expect(this.code).toHaveText(metaLeft);
  };
};