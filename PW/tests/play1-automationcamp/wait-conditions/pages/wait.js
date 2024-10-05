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
      prompt.type() === 'confirm' 
        ? await prompt.accept() 
        : await prompt.dismiss()
    });

    const promptBtnText = 'Show Prompt';
    const confirmResText = 'Confirm response: OK';

    const promptBtn = this.page.getByRole('button', { name: promptBtnText });
    const confirmRes = this.page.locator('#confirm_ok');

    await promptBtn.click();

    // TODO: Check text in prompt
    await expect(promptBtn).toBeVisible();
    await expect(confirmRes).toHaveText(confirmResText);
  };
};