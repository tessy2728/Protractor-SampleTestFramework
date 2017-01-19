'use strict';

var Page = require('./page.js');
var gloabalConst = require('../constants/constants');
var runConfig = require('../config/run-env-config');

var Login_Page = function () {
  this.searchBox = element(by.model('navbarController.searchText'));;
  var usernameText = element(by.id('EML'));
  var passwordText = element(by.id('OLD_PW'));
  var loginButton = $('input[value=登入]');
  var continueShoppingButton = element(by.xpath('//button[@ng-click="accountPageController.goToHome()"]'));

  var euUsernameText = element(by.xpath('//input[@name="email"]'));
  var euPasswordText = element(by.xpath('//input[@name="password"]'));
  var loginButtonEU = element(by.xpath('//button[@analytics-event="Log-in"]'));
  var errorMessage = element(by.xpath('//section[@class="uni-form-error-summary ng-binding"]'));
  var baseURL = runConfig[gloabalConst.PRODUCTION].baseURL;
  var forgotPassword = element(by.xpath('//a[@ng-href="' + baseURL + gloabalConst.PASSWORD_RESET_URL + '"]'));
  var modalPopup = element(by.xpath('//ion-modal-view[@class="uni-modal modal none ng-enter active ng-enter-active"]'));
  var loginButtonFooterEu = element(by.className('uni-footer-view__list uni-footer-us__text'));
  var modalOkButton = element(by.xpath(
    '//ion-modal-view[@class="uni-modal modal none ng-enter active ng-enter-active"]//button'));
  var guestCheckoutEU = element(by.xpath('//button[@class="uni-login-page__register-button"]'));

  var krUsernameText = element(by.xpath('//input[@id="loginid"]'));
  var krPasswordText = element(by.xpath('//input[@id="tempPassword"]'));
  var loginButtonKr = element(by.xpath('//div[@class=\'login_input\']//a[@class=\'btn_po bs_login ui-link\']'));
  var krSignUpButton = element(by.xpath('//div[@class="btnArea padB40"]//a'));
  var orderHistoryEu = element(by.className('account-page__section'));
  var orderHistory = element(by.xpath(
    '//a[@ng-if="accountPageController.config.SHOW_ORDER_HISTORY_LINK === true&& accountPageController.orderHistoryView"]//div[@class="account-page__section"]'
  ));
  var registerButtonEU = element(by.xpath('//button[@ng-click="loginPageController.goToRegisteration()"]'));

  this.pageLoaded = this.and(
    this.isVisible($('input#login'))
  );

  this.setUserName = function (username) {
    usernameText.clear();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    usernameText.sendKeys(username);
    usernameText.getText().then(function (text) {
    });
  };

  this.setPassword = function (password) {
    passwordText.clear();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    passwordText.sendKeys(password);
  };

  this.setUserNameKr = function (username) {
    krUsernameText.clear();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    krUsernameText.sendKeys(username);
    krUsernameText.getText().then(function (text) {
    });
  };

  this.setPasswordKr = function (password) {
    krPasswordText.clear();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    krPasswordText.sendKeys(password);
  };

  this.setUserNameEU = function (username) {
    euUsernameText.clear();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    euUsernameText.sendKeys(username);
    browser.driver.sleep(5000);
    euUsernameText.getText().then(function (text) {
    });
  };

  this.setPasswordEU = function (password) {
    euPasswordText.clear();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    euPasswordText.sendKeys(password);
  };

  this.clickContinueShopping = function () {
    continueShoppingButton.click();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

  this.clickForgotPassword = function () {
    var appWindow = browser.getWindowHandle();
    forgotPassword.click().then(function () {
      browser.driver.sleep(gloabalConst.SLEEP_2SEC);
      browser.getAllWindowHandles().then(function (handles) {
        if (handles.length > 1) {
          browser.switchTo().window(handles[1]).then(function () {
            // fill in the form here
            browser.driver.sleep(gloabalConst.SLEEP_4SEC);
            browser.ignoreSynchronization = true;
            expect(browser.driver.getCurrentUrl()).toContain(runConfig[gloabalConst.PRODUCTION].baseURL +
              gloabalConst.PASSWORD_RESET_URL);
            //to close the current window
            browser.driver.close().then(function () {
              //to switch to the previous window
              browser.ignoreSynchronization = false;
              browser.switchTo().window(appWindow);
              expect(browser.driver.getCurrentUrl()).toContain(browser.baseUrl + gloabalConst.LOGIN_URL);
            });
          });
        } else {
          expect(browser.driver.getCurrentUrl()).toContain(runConfig[gloabalConst.PRODUCTION].baseURL +
            gloabalConst.PASSWORD_RESET_URL);
          browser.navigate().back();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        }
      });
    });
  };

  this.isLoginButtonPresent = function () {
    if ((browser.params.region === gloabalConst.EU_REGION) || (browser.params.region === gloabalConst.DE_REGION) ||
      (browser.params.region === gloabalConst.FR_REGION)) {
      expect(loginButtonFooterEu.isPresent()).toBe(true, 'Login Button not present');
    } else {
      expect(loginButtonEU.isPresent()).toBe(true, 'Login Button not present');
    }
  };

  this.isLoginPresent = function () {
    expect(loginButtonEU.isPresent()).toBe(true, 'Login Button not present');
  };

  this.checkErrorMessage = function () {
    errorMessage.getText().then(function (text) {
      if (browser.params.region === gloabalConst.EU_REGION) {
        expect(text).toEqual('Some information is incorrect, please check and try again.',
          'Error message not displayed properly');
      } else if (browser.params.region === gloabalConst.DE_REGION) {
        expect(text).toEqual('Etwas scheint nicht zu stimmen. Bitte korrigieren Sie die Eingabe.',
          'Error message not displayed properly');
      } else if (browser.params.region === gloabalConst.FR_REGION) {
        expect(text).toEqual(
          'Certaines informations sont incorrectes, veuillez corriger et valider une nouvelle fois',
          'Error message not displayed properly');
      }
    });
  };


  this.clickLoginButton = function (username, password) {
    if (browser.params.region === gloabalConst.TW_REGION) {
      this.setUserName(username);
      this.setPassword(password);
      loginButton.click();
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    } else if (browser.params.region === gloabalConst.KR_REGION) {
      this.setUserNameKr(username);
      this.setPasswordKr(password);
      loginButtonKr.click();
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    } else if (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
      browser.params.region === gloabalConst.FR_REGION) {
      this.setUserNameEU(username);
      this.setPasswordEU(password);
      loginButtonEU.click();
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    }
  };

  this.checkForModalofAddedItems = function () {
    modalPopup.isPresent().then(function (status) {
      if (status) {
        expect(modalPopup.isPresent()).toBe(true, 'The already added items moved to cart dialogue not present');
      };
    });
  };

  this.isModalPresent = function () {
    return modalPopup.isPresent();
  };

  this.clickModalOk = function () {
    modalOkButton.isPresent().then(function (status) {
      if (status) {
        modalOkButton.click();
      }
    });
  };

  this.clickOnSignupButton = function () {
    krSignUpButton.getLocation().then(function (position) {
      browser.executeScript('window.scrollTo(' + position.x + ',' + position.y + ');').then(function () {
        krSignUpButton.click();
        browser.driver.sleep(gloabalConst.SLEEP_2SEC);
      });
    });
  };

  this.clickRegister = function () {
    registerButtonEU.getLocation().then(function (position) {
      browser.executeScript('window.scrollTo(' + position.x + ',' + position.y + ')').then(function () {
        registerButtonEU.click();
        browser.driver.sleep(gloabalConst.SLEEP_2SEC);
      });
    });
  };

  this.clickGuestCheckout = function () {
    guestCheckoutEU.getLocation().then(function (position) {
      browser.executeScript('window.scrollTo(' + position.x + ',' + position.y + ');').then(function () {
        guestCheckoutEU.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
      });
    });
  };

  this.clickOnOrderHistoryButton = function () {
    if ((browser.params.region === gloabalConst.EU_REGION) || (browser.params.region === gloabalConst.FR_REGION) ||
      (browser.params.region === gloabalConst.DE_REGION)) {
      orderHistoryEu.click();
    } else {
      orderHistory.click();
    }
    browser.driver.sleep(gloabalConst.SLEEP_2SEC);
    browser.driver.sleep(gloabalConst.SLEEP_2SEC);
    expect(browser.driver.getCurrentUrl()).toEndWith('orders');
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

};

Login_Page.prototype = Page; // extend basePage...
module.exports = new Login_Page();