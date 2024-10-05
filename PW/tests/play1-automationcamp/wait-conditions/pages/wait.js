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
    // TODO: Maybe fix expect data to toBe()
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
    // TODO: Maybe fix expect data to toBe()
    await expect(confirmRes).toHaveText(confirmResText);
  };

  async waitTriggerVisible() {
    const triggerBtn = this.page.locator('#visibility_trigger');
    const clickMeBtn = this.page.locator('#visibility_target');

    const actualDataContent = 'I just removed my invisibility cloak!!';
    const receivedDataContent = await clickMeBtn.getAttribute('data-content');

    await triggerBtn.click();

    await expect(clickMeBtn).toBeVisible();

    await clickMeBtn.click();

    expect(actualDataContent).toBe(receivedDataContent);
  };

  async waitTriggerInvisible() {
    const triggerBtn = this.page.locator('#invisibility_trigger');
    const spinner = this.page.locator('#invisibility_target');
    const spinnerGone = this.page.locator('#spinner_gone');

    const actualspinnerGoneText = 'Thank God that spinner is gone!';
    const receivedSpinnerGoneText = await spinnerGone.textContent(spinnerGone);

    await expect(spinner).toBeVisible();
    
    await triggerBtn.click();
    
    await expect(spinner).not.toBeVisible();

    expect(actualspinnerGoneText).toBe(receivedSpinnerGoneText);
  };

  async waitEnabled() {
    const disabledBtnText = 'Disabled Button';
    const enabledBtnText = 'Enabled Button';

    const triggerBtn = this.page.locator('#enabled_trigger');
    const disabledBtn = this.page.getByRole('button', { name: disabledBtnText });
    const enabledBtn = this.page.getByRole('button', { name: enabledBtnText });

    await expect(disabledBtn).toBeVisible();
    
    await triggerBtn.click();
    
    await expect(enabledBtn).toBeEnabled();

    const actualDataContent = 'See, you just clicked me!!';
    const receivedDataContent = await enabledBtn.getAttribute('data-content');
    
    expect(actualDataContent).toBe(receivedDataContent);
  };
};