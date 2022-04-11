const puppeteer = require('puppeteer');

const Automation = require('../automation');

class Puppeteer extends Automation {
  async createAutomationInstance() {
    this.browser = await puppeteer.launch({ headless: true });
    this.page = await this.browser.newPage();
  }

  async goTo(url) {
    await this.page.goto(url);
  }

  async click(type, selector) {
    if (type === 'xpath') return await this.clickByXpath(selector);
    if (type === 'cssSelector') return await this.clickBySelector(selector);

    new Error('Type informed not valid, use: xpath or cssSelector');
  }

  async type(type, selector, text) {
    if (type === 'xpath') return await this.typeByXpath(selector, text);
    if (type === 'cssSelector')
      return await this.typeBySelector(selector, text);

    new Error('Type informed not valid, use: xpath or cssSelector');
  }

  async getText(type, selector) {
    if (type === 'xpath') return await this.getTextByXpath(selector);
    if (type === 'cssSelector') return await this.getTextBySelector(selector);

    new Error('Type informed not valid, use: xpath or cssSelector');
  }

  async clickBySelector(selector) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async clickByXpath(xpath) {
    await this.page.waitForXPath(xpath);
    const [element] = await this.page.$x(xpath);
    await element.click();
  }

  async typeBySelector(selector, text) {
    await this.page.waitForSelector(selector);
    await this.page.type(selector, text);
  }

  async typeByXpath(xpath, text) {
    await this.page.waitForXPath(xpath);
    const [element] = await this.page.$x(xpath);
    await element.type(text);
  }

  async getTextBySelector(selector) {
    await page.waitForSelector(selector);
    const element = await page.$(selector);
    const text = await page.evaluate(el => el.textContent, element);
    return text;
  }

  async getTextByXpath(xpath) {
    await this.page.waitForXPath(xpath);
    const [element] = await this.page.$x(xpath);
    const text = await page.evaluate(el => el.textContent, element);
    return text;
  }
}

module.exports = new Puppeteer();
