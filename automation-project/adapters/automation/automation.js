class Automation {

  /**
   * Method to create an instance using automation framework choiced.
   */
  async createAutomationInstance() { new Error("Method not implemented for this framework") }

  /**
   * Method to goto automation to a respective page
   * @param {*} url application url to go to
   */
  async goTo(url) { new Error("Method not implemented for this framework") }

  /**
   * Method to click in an element of the HTML
   * 
   * @param {*} type selector type: xpath or cssSelector are accepted
   * @param {*} selector selector to find element to interact
   */
  async click(type, selector) { new Error("Method not implemented for this framework") }

  /**
   * Method to type text in an element of the HTML
   * 
   * @param {*} type selector type: xpath or cssSelector are accepted
   * @param {*} selector selector to find element to interact
   * @param {*} text text to insert in element found by selector
   */
  async type(type, selector, text) { new Error("Method not implemented for this framework") }

  /**
   * Method to get text of the HTML element
   * 
   * @param {*} type selector type: xpath or cssSelector are accepted
   * @param {*} selector selector to find element to interact
   */
  async getText(type, selector) { new Error("Method not implemented for this framework") }
}

module.exports = Automation;
