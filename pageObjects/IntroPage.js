class IntroPage {
    constructor(page) {
      this.page = page;
    }
  
    async gotoIntroPage() {
      // Go to the intro page
      await this.page.goto('https://playwright.dev/docs/intro');
    }
  
    async getFirstItemText() {
      // Return the text of the first item
      return await this.page.textContent('a[href="/docs/intro#installing-playwright"]');
    }
  
    async getSecondItemText() {
      // Return the text of the second item
      return await this.page.textContent('a[href="/docs/intro#whats-installed"]');
    }
  
    async getThirdItemText() {
      // Return the text of the third item
      return await this.page.textContent('a[href="/docs/intro#running-the-example-test"]');
    }
  
    async getFourthItemText() {
      // Return the text of the fourth item
      return await this.page.textContent('a[href="/docs/intro#html-test-reports"]');
    }
  }
  
  module.exports = IntroPage;
  