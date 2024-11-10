import { BasePage } from "../../pages/base";
import { expect } from '@playwright/test';

export class FramesPage extends BasePage{
  constructor(page) {
    super(page);

    this.firstFrame = this.page.frameLocator('#frame1');
    this.secondFrame = this.firstFrame.frameLocator('#frame2');
    this.thirdFrame = this.firstFrame.frameLocator('#frame3');
    this.fourthFrame = this.thirdFrame.frameLocator('#frame4');
  };

  async framesClicks(frame, btnSelector) {
    const frameBtn = await frame.locator(btnSelector);
    
    await frameBtn.click();
    
    const btnTextReceived = await frameBtn.textContent();
    expect(btnTextReceived).toBe('Clicked');
  };

  async clickFirstFrame() {
    await this.framesClicks(this.firstFrame, '#click_me_1');
  };
  
  async clickSecondFrame() {
    await this.framesClicks(this.secondFrame, '#click_me_2');
  };

  async clickFourthFrame() {
    await this.framesClicks(this.fourthFrame, '#click_me_4');
  };
};