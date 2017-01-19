'use strict';

var Page = function () {
  /**
   * wait and verify that a page is loaded
   * @returns {promise} 
   * @requires a page to include `pageLoaded` method
   */
  this.at = function () {
    return browser.wait(this.pageLoaded(), this.timeout.xl);
  };

  /**
   * navigate to a page via it's `url` var
   * and verify/wait via at()
   * 
   * @requires page have both `url` and `pageLoaded` properties
   */
  this.to = function () {
    browser.get(browser.baseUrl, this.timeout.xl);
    return this.at();
  };

  /**
   * Wrappers for expected conditions
   *
   * I find ECs are generally poorly named, so we wrap them in
   * methods that are 9% more sexy, and allow us to add logging, etc...
   *
   * @returns {ExpectedCondition}
   */
  var EC = protractor.ExpectedConditions;

  this.isVisible = function (locator) {
    return EC.visibilityOf(locator);
  };

  this.isNotVisible = function (locator) {
    return EC.invisibilityOf(locator);
  };

  this.inDom = function (locator) {
    return EC.presenceOf(locator);
  };

  this.notInDom = function (locator) {
    return EC.stalenessOf(locator);
  };

  this.isClickable = function (locator) {
    return EC.elementToBeClickable(locator);
  };

  this.hasText = function (locator, text) {
    return EC.textToBePresentInElement(locator, text);
  };

  this.and = function (arrayOfFunctions) {
    return EC.and(arrayOfFunctions);
  };

  this.titleIs = function (title) {
    return EC.titleIs(title);
  };

  /**
   * wrap this.timeout. (ms) in t-shirt sizes
   */
  this.timeout = {
    'xs': 420000,
    's': 1000000,
    'm': 2000000,
    'l': 5000000,
    'xl': 9000000,
    'xxl': 15000000
  };

  /**
   * test if an element has a class
   * 
   * @param  {elementFinder} locator - eg. $('div#myId')
   * @param  {string}  klass  - class name
   * @return {Boolean} - does the element have the class?
   */
  this.hasClass = function (locator, klass) {
    return locator.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(klass) !== -1;
    });
  };

  /**
   * Webdriver equivilant to hitting Enter/Return key.
   */
  this.hitEnter = function () {
    return browser.actions().sendKeys(protractor.Key.ENTER).perform();
  };

  /**
   * switches focus to a new window
   * @param  {int} windowHandleIndex - the nth window to switch to
   * @param  {pageObject} targetPage - the page we'll be on after the switch
   */
  this.switchToWindow = function (windowHandleIndex, targetPage) {
    // var that = this;
    // wait for new page to open...
    var handle = browser.wait(function () {
      return browser.getAllWindowHandles().then(function (handles) {
        // make sure window we're switching to exists...
        if (handles.length > windowHandleIndex) {
          return handles[windowHandleIndex];
        } else {
          throw new Error('window index ' + windowHandleIndex + ' does not exist');
        }
      });
    }, this.timeout.xxl);
    browser.switchTo().window(handle);
    // test that we're at the new page...
    targetPage.at();
  };

  this.clearAndType = function (element, text) {
    element.clear();
    element.sendKeys(text);
  };

  /**
   * get an element's width
   * extend's protractors ElementFinder
   * 
   * @return {int} - the width of the element
   */
  protractor.ElementFinder.prototype.getWidth = function () {
    return this.getSize().then(function (size) {
      return size.width;
    });
  };

};
module.exports = new Page();