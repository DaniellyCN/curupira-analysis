const puppeteer = require('puppeteer');

const Automation = require('../automation');
const { log } = require('../../logger');

class Puppeteer extends Automation {
  async createAutomationInstance() {
    log('Starting browser');
    this.browser = await puppeteer.launch({ headless: true });
    this.page = await this.browser.newPage();
    log('Browser Started');
  }

  async goTo(url) {
    log('Going to ' + url);
    await this.page.goto(url);
    log('Went to url');
  }

  async click(type, selector) {
    log('Clicking in an element');
    if (type === 'xpath') return await this.clickByXpath(selector);
    if (type === 'cssSelector') return await this.clickBySelector(selector);

    new Error('Type informed not valid, use: xpath or cssSelector');
  }

  async type(type, selector, text) {
    log('Typing in an element');
    if (type === 'xpath') return await this.typeByXpath(selector, text);
    if (type === 'cssSelector')
      return await this.typeBySelector(selector, text);

    new Error('Type informed not valid, use: xpath or cssSelector');
  }

  async getText(type, selector) {
    log('Loading text of the page');
    if (type === 'xpath') return await this.getTextByXpath(selector);
    if (type === 'cssSelector') return await this.getTextBySelector(selector);

    new Error('Type informed not valid, use: xpath or cssSelector');
  }

  async getTableContentByXpath(selector, waiting = true) {
    log('Loading table content of the page');
    await this.page.waitForXPath(selector);
    await this.sleep(5000);
    const elements = await this.page.$x(selector);
    const texts = [];
    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      const line = await this.page.evaluate(el => el.textContent, element);
      texts.push(line);
    }
    return texts;
  }

  async getAmountElementsByXpath(selector) {
    log('Counting amount of the itens');
    await this.page.waitForXPath(selector);
    await this.sleep(5000);
    const elements = await this.page.$x(selector);
    return elements.length;
  }

  async finishAutomation() {
    log('Finishing automation');
    await this.browser.close();
    log('Automation finished');
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
    const element = await this.page.$(selector);
    const text = await this.page.evaluate(el => el.textContent, element);
    return text;
  }

  async getTextByXpath(xpath) {
    await this.page.waitForXPath(xpath);
    const [element] = await this.page.$x(xpath);
    const text = await this.page.evaluate(el => el.textContent, element);
    return text;
  }
}

module.exports = new Puppeteer();
