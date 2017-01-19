'use strict';

var l1Page = require('../pages/L1_Page');
var footer = require('../pages/Footer');
var loginPage = require('../pages/Login_Page');

var l3PageTestData = require('../data/L3Page_TestData');
var gloabalConst = require('../constants/constants');


require('jasmine-expect');

describe('Korea - Login to the site from L1', function () {
  var isAuthenticated;
  beforeAll(function () {
    l1Page.to();
    expect(l1Page.at()).toBeTruthy();
    l1Page.checkIfDepartmentTabsDisplayedKr();
  });

  it('Go to Login Page - should be logged in and redirected back to L1 page', function () {
    l1Page.closeBanner();
    footer.isAuthenticated().then(function (status) {
      isAuthenticated = status;
      if (!isAuthenticated) {
        footer.gotoLogin();
        browser.driver.sleep(gloabalConst.SLEEP_10SEC);
        browser.ignoreSynchronization = true;
        browser.driver.sleep(gloabalConst.SLEEP_10SEC);
        loginPage.clickLoginButton(l3PageTestData.loginCreds[process.env[gloabalConst.TEST_ENVIRONMENT]]
          .username,
          l3PageTestData.loginCreds[process.env[gloabalConst.TEST_ENVIRONMENT]].password);
        browser.driver.sleep(gloabalConst.SLEEP_10SEC);
        browser.driver.sleep(gloabalConst.SLEEP_10SEC);
        expect(l1Page.at()).toBeTruthy('Login from L1 page not retained the same page');
        expect(footer.isAuthenticated()).toBe(true, 'Login not success');
        isAuthenticated = true;
      }
    });
  });

  it('Logging out and redirect to home page', function () {
    if (isAuthenticated) {
      footer.clickLogoutButton();
      expect(l1Page.at('Logout from L1 page not retained the same page')).toBeTruthy();
    }
  });

});