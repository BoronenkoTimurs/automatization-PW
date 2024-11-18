import test, { expect, Locator, Page } from "@playwright/test";

export class GitHub {
  public readonly firstIssue: Locator;

  constructor(private readonly page: Page) {
    this.firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();
  };

  async goTo(url: string) {
    await test.step('Go To the Url', async () => {
      await this.page.goto(url, { waitUntil: "networkidle"});
    });
  };

  async verifyFirstIssue() {
    await test.step('Verify first Issue in the List', async () => {      
      await expect(this.firstIssue).toHaveText('[Bug] Title');
    });
  };
};