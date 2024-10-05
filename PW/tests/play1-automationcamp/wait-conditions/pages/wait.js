import { expect } from '@playwright/test';
import { BasePage } from '../../pages/base';

export class WaitPage extends BasePage {
  async waitAlert() {
    this.page.once('dialog', async (alert) => {      
      await alert.accept();
    });

    const alertBtnText = 'Show Alert';
    const alertHandledText = 'Alert handled';

    const showAlertBtn = this.page.getByRole('button', { name: alertBtnText });
    const alertHandledSpan = this.page.locator('#alert_handled_badge');
    
    await showAlertBtn.click();

    await expect(showAlertBtn).toBeVisible();
    await expect(alertHandledSpan).toHaveText(alertHandledText);
  };

  async waitPrompt() {
    this.page.once('dialog', async (prompt) => {
      const promptTextExpected = "Choose wisely... It's your life!";

      let promptTextReceived = await prompt.message();
      promptTextReceived = promptTextReceived.replace(/\s+/g, ' ').trim();

      expect(promptTextReceived).toBe(promptTextExpected)
      
      prompt.type() === 'confirm' 
        ? await prompt.accept() 
        : await prompt.dismiss()
    });

    const promptBtnText = 'Show Prompt';
    const confirmResText = 'Confirm response: OK';

    const promptBtn = this.page.getByRole('button', { name: promptBtnText });
    const confirmRes = this.page.locator('#confirm_ok');

    await promptBtn.click();

    await expect(promptBtn).toBeVisible();
    await expect(confirmRes).toHaveText(confirmResText);
  };

  async waitTriggerVisible() {
    const triggerBtn = this.page.locator('#visibility_trigger');
    const clickMeBtn = this.page.locator('#visibility_target');

    const dataContentText = 'I just removed my invisibility cloak!!';
    const dataContent = await clickMeBtn.getAttribute('data-content');

    await triggerBtn.click();

    await expect(clickMeBtn).toBeVisible();

    await clickMeBtn.click();

    expect(dataContent).toBe(dataContentText);
  };

  async waitTriggerInvisible() {
    const triggerBtn = this.page.locator('#invisibility_trigger');
    const spinner = this.page.locator('#invisibility_target');
    const spinnerGone = this.page.locator('#spinner_gone');

    const spinnerGoneTextExpected = 'Thank God that spinner is gone!';
    const spinnerGoneTextReceived = await spinnerGone.textContent(spinnerGone);

    await expect(spinner).toBeVisible();
    
    await triggerBtn.click();
    
    await expect(spinner).not.toBeVisible();

    expect(spinnerGoneTextExpected).toBe(spinnerGoneTextReceived);
  };
};