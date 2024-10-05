export class BasePage {
  constructor(page) {
    this.page = page;
  };

  gotoPage(url) {
    return this.page.goto(url);
  };

  pause() {
    return this.page.pause();
  };
}