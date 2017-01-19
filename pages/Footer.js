'use strict';

var Page = require('./page.js');
var gloabalConst = require('../constants/constants');
var _ = require('lodash');
var regionalConst = require('../constants/'+ browser.params.region +'-constants');

var runConfig = require('../config/run-env-config');
var map_url = runConfig[process.env[gloabalConst.TEST_ENVIRONMENT]].mapURL
var Footer = function () {
  var optionList = ((browser.params.region === gloabalConst.EU_REGION) || (browser.params.region === gloabalConst.FR_REGION) ||
    (browser.params.region === gloabalConst.DE_REGION)) ?
    element(by.xpath('//div[@class="uni-footer-us"]')) : element(by.xpath(
      '//ion-list[@class=\'uni-icon-links-list disable-user-behavior\']'));
  if (browser.params.region === gloabalConst.EU_REGION ||
    browser.params.region === gloabalConst.DE_REGION ||
    browser.params.region === gloabalConst.FR_REGION) {
    var storeInformationLink = element(by.xpath(
      '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//a[@ng-href=\'' + map_url + '\']'
    ));
  }
  var confirmationModal = element(by.xpath('//ion-modal-view[@class="uni-modal modal"]'));
  var confirmBtn = element.all(by.xpath('//button[@ng-click="footerController.closePopup()"]')).get(0);

  if(browser.params.region === gloabalConst.US_REGION) {
    var storeInformationLink = element(by.xpath(
      '//div[@class="uni-footer-view__list uni-footer-us__text"]'
    ));
  }

  if (browser.params.region === gloabalConst.TW_REGION) {
    var storeInformationLink = element(by.xpath(
      '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//ion-item[@footerurl=\'footerController.getStoreUrl()\']'
    ));
  }
  if (browser.params.region === gloabalConst.KR_REGION) {
    var storeInformationLink = element(by.xpath(
      '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//ion-item[@url=\'map_url\']'
    ));
  }
  var subscribeToNewsLetterLink = element(by.xpath(
    '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//div[@ng-controller="FooterController as footerController"]' +
    '//ion-item[@id="qa-uni-icon-link__newsletter"]'
  ));
  var subscribeToNewsLetterLinkEU = element(by.xpath(
    '//button[@ng-click=\'footerController.enewsSubscription()\']'
  ));
  var memberLoginLinkKR = element(by.xpath(
    '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//ion-item[@id="qa-uni-icon-link__login"][@ng-if="!footerController.isLoggedin"]'
  ));
  var memberLogoutLinkKr = element(by.xpath(
    '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//ion-item[@analytics-label="Logout"]'));
  var memberLoginLink = element(by.xpath(
    '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//ion-item[@id=\'qa-uni-icon-link__login\']' +
    '[@ng-if=\'!footerController.isAuthenticated() && footerController.isGDSLink\']'));
  var memberLogoutLink = element(by.xpath('//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']' +
    '//ion-item[@id=\'qa-uni-icon-link__logout\'][@ng-if=\'footerController.isAuthenticated() && footerController.isGDSLink\']'
  ));
  var memberLogoutLinkEU = element(by.xpath('//div[@ng-click=\'footerController.logout()\']'));
  var memberLoginLinkEU = element(by.xpath('//div[@ng-click=\'footerController.gotoAccountOrLogin()\']'));
  var myAccountLinkUS = element(by.xpath('//a[@ng-click=\'footerController.gotoAccountOrLogin()\']'));
  var signUpNowLink = element(by.xpath(
    '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//ion-item[@id=\'qa-uni-icon-link__register\']' +
    '[@ng-if=\'!footerController.isAuthenticated() && footerController.isGDSLink\']'));
  var signUpNowLinkEU = element(by.xpath('//button[@ng-click=\'loginPageController.goToRegisteration()\']'));
  var gdsAccountLink = element(by.xpath(
    '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//ion-item[@id=\'qa-uni-icon-link__account\']' +
    '[@ng-show=\'footerController.isAuthenticated() && footerController.isGDSLink\']'));

  var nonGdsAccountLink = element(by.xpath(
    '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//ion-item[@id=\'qa-uni-icon-link__account\']' +
    '[@ng-show=\'footerController.isAuthenticated() && !footerController.isGDSLink\']'));


  var lifeToolsLink = element(by.xpath(
    '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//div[@class=\'uni-icon-link__icon icon uni-icon-life-tools\']'
  ));
  var helpLink = (browser.params.region === gloabalConst.TW_REGION) ? element(by.xpath(
      '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//ion-item[@footerurl="footerController.getHelpUrl()"]')) :
    element(by.xpath(
      '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//a[@ng-click="footerController.goToUrl(footerController.getHelpUrl())"]//div[@class="uni-footer-view__list uni-footer-us__text"]'
    ));
  if (browser.params.region === gloabalConst.KR_REGION) {
    var helpLink = element(by.xpath(
      '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//ion-item[@url="customer_care_url"]'));

  }
  var aboutUniqloLink = (browser.params.region === gloabalConst.TW_REGION) ? element(by.xpath(
    '//ion-item[@footerurl=\'footerController.getAboutUsUrl()\']')) : element(by.xpath(
      '//a[@ng-click=\'footerController.goToUrl(footerController.getAboutUsUrl())\']'));
  if (browser.params.region === gloabalConst.KR_REGION) {
    var aboutUniqloLink = element(by.xpath(
      '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//ion-item[@url="company/about_company"]'));
  }

  var shippingLink = element(by.xpath(
    '//div[@ng-if=\'!indexCtrl.hiddenfooterStatus()\']//div[@class=\'uni-icon-link__icon icon uni-icon-shipping\']'
  ));
  var countryPicker = element(by.xpath('//div[@ng-click=\'countryPickerController.openCountryPickerPopup()\']'));
  var contactUs = element(by.xpath('//a[@ng-click=\'footerController.goToUrl(footerController.getContactUsUrl())\']'));
  var countrySelectorLink = element(by.xpath(
    '//div[@ng-if="!indexCtrl.hiddenfooterStatus()"]//ion-item[@class="uni-icon-link uni-icon-link--small uni-icon-link--country-switcher item"]'
  ));

  var countryFlag = element(by.xpath('//div[@ng-click=\'countryPickerController.openCountryPickerPopup()\']//img'));
  var countryPickerText = element(by.xpath(
    '//div[@ng-click=\'countryPickerController.openCountryPickerPopup()\']//span'));
  var countrySelector = element.all(by.xpath('//div[@ng-click=\'countryPickerController.changeCountry(country)\']'));
  var deliveryLink = element(by.xpath('//a[@ng-click=\'footerController.goToUrl(footerController.getShippingUrl())\']'));
  var termsAndConditions = element(by.xpath('//a[@ng-click="footerController.goToUrl(footerController.getTermsAndConditionsUrl())"]'));
  var privacyPolicy = element(by.xpath('//a[@ng-click="footerController.goToUrl(footerController.getPrivacyPolicyUrl())"]'));
  var EC = protractor.ExpectedConditions;
  var aboutUniqloText = element.all(by.xpath(' //ion-item[@footerurl=\'footerController.getAboutUsUrl()\']//div[@class=\'uni-icon-link__content\']'));
  var lifetoolsText = element.all(by.xpath('//ion-item[@id=\'qa-uni-icon-link__life-tools\']//div[@class=\'uni-icon-link__content\']'));

  this.isStoreLocatorLinkPresent = function () {
    expect(storeInformationLink.isPresent()).toBe(true, 'Footer Store information link not present');
  };

  this.isSubscribeNewsLetterLinkPresent = function () {
    if (browser.params.region === gloabalConst.TW_REGION) {
      expect(subscribeToNewsLetterLink.isPresent()).toBe(true, 'Footer Subscribe news letter link not present');
    } else if (_.includes(gloabalConst.EU_REGIONS, browser.params.region)) {
      expect(subscribeToNewsLetterLinkEU.isPresent()).toBe(true, 'Footer Subscribe news letter link not present');
    }

  };
  
  this.isTermsAndConditions = function () {
    expect(termsAndConditions.isPresent()).toBe(true, 'Footer Terms And Conditions link not present');
  };

  this.isPrivacyPolicyLinkPresent = function () {
    expect(privacyPolicy.isPresent()).toBe(true, 'Footer Privacy Policy link not present');
  };

  this.isdeliveryLinkPresent = function () {
    expect(deliveryLink.isPresent()).toBe(true, 'Footer Delivery link not present');
    deliveryLink.isPresent().then(function () {
      deliveryLink.click();
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
      if (_.includes(gloabalConst.EU_REGIONS, browser.params.region)) {
        expect(browser.driver.getCurrentUrl()).toContain('/company/faq/delivery.html', 'Redirection to delivery page not done');
      }
      browser.navigate().back();
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    });
  };

  this.isMemberLoginLinkPresent = function () {
    if (browser.params.region === gloabalConst.TW_REGION) {
      expect(memberLoginLink.isPresent()).toBe(true, 'Footer Member Login link not present');
    } else if (browser.params.region === gloabalConst.KR_REGION) {
      expect(memberLoginLinkKR.isPresent()).toBe(true, 'Footer Member Login link not present');
    } else if (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
      browser.params.region === gloabalConst.FR_REGION) {
      expect(memberLoginLinkEU.isPresent()).toBe(true, 'Footer Member Login link not present');
    }
  };
  
  this.isMemberLogoutLinkPresent = function () {
    if (browser.params.region === gloabalConst.TW_REGION) {
      expect(memberLogoutLink.isPresent()).toBe(true, 'Footer Member Login link not present');
    } else if (browser.params.region === gloabalConst.KR_REGION) {
      expect(memberLogoutLinkKr.isPresent()).toBe(true, 'Footer Member Login link not present');
    } else if (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
      browser.params.region === gloabalConst.FR_REGION) {
      expect(memberLogoutLinkEU.isPresent()).toBe(true, 'Footer Member Login link not present');
    }
  };
  
  this.isMyAccountLinkPresent = function () {
      expect(myAccountLinkUS.isPresent()).toBe(true, 'Footer Member Login link not present');
  };

  this.isMemberLoginLinkPresent_kr = function () {
    expect(memberLoginLinkKR.isPresent()).toBe(true, 'Footer Member Login link not present');
  };

  this.confirmNewsLetterSubscription = function (email) {
    expect(confirmationModal.isPresent()).toBe(true, 'Confirmation modal not displayed');
    confirmBtn.click();
  };

  this.isAccountLinkPresent = function () {
    if (browser.params.region === gloabalConst.TW_REGION || browser.params.region === gloabalConst.KR_REGION) {
      expect(gdsAccountLink.isPresent()).toBe(true, 'Footer SignUp now link not present');
    } else if (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
      browser.params.region === gloabalConst.FR_REGION) {
      expect(nonGdsAccountLink.isPresent()).toBe(true, 'Footer SignUp now link not present');
    }
  };

  this.isSignUpNowLinkPresent = function () {
    if (browser.params.region === gloabalConst.TW_REGION || browser.params.region === gloabalConst.KR_REGION) {
      expect(signUpNowLink.isPresent()).toBe(true, 'Footer SignUp now link not present');
    } else if (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
      browser.params.region === gloabalConst.FR_REGION) {
      expect(signUpNowLinkEU.isPresent()).toBe(true, 'Footer SignUp now link not present');
    }
  };

  this.isLifeToolLinkPresent = function () {
    expect(lifeToolsLink.isPresent()).toBe(true, 'Footer Life Tool link not present');
  };

  this.isHelpLinkPresent = function () {
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    expect(helpLink.isPresent()).toBe(true, 'Footer Help link not present');
    helpLink.isPresent().then(function () {
      helpLink.getLocation().then(function (pos) {
        browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {   
          helpLink.click();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
          if (_.includes(gloabalConst.EU_REGIONS, browser.params.region)) {
            expect(browser.driver.getCurrentUrl()).toContain('/company/help.html','Redirection to help page not done');
          }
          browser.navigate().back();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        });
      });
    });
  };

  this.isAboutUniqloLinkPresent = function () {
    expect(aboutUniqloLink.isPresent()).toBe(true, 'Footer About Uniqlo link not present');
  };

  this.isShippingLinkPresent = function () {
    expect(shippingLink.isPresent()).toBe(true, 'Shipping link not present');
  };

  this.isCountryPickerPresent = function () {
    expect(countryPicker.isPresent()).toBe(true, 'Country Picker link not present');
  };

  this.isContactUsLinkPresent = function () {
    expect(contactUs.isPresent()).toBe(true, 'ContactUs link not present');
  };

  this.clickContactUsLink = function () {
    var appWindow = browser.getWindowHandle();
    contactUs.getLocation().then(function (pos) {
      browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
        contactUs.click().then(function () {
          browser.driver.sleep(gloabalConst.SLEEP_2SEC);
          browser.getAllWindowHandles().then(function (handles) {
            if (handles.length > 1) {
              browser.switchTo().window(handles[1]).then(function () {
                // fill in the form here
                browser.driver.sleep(gloabalConst.SLEEP_4SEC);
                browser.ignoreSynchronization = true;
                expect(browser.driver.getCurrentUrl()).toContain(gloabalConst.CONTACT_US_URL);
                //to close the current window
                browser.driver.close().then(function () {
                  //to switch to the previous window
                  browser.ignoreSynchronization = false;
                  browser.switchTo().window(appWindow);
                });
              });
            } else {
              expect(browser.driver.getCurrentUrl()).toContain(gloabalConst.CONTACT_US_URL);
              browser.navigate().back();
              browser.driver.sleep(gloabalConst.SLEEP_3SEC);
            }
          });
        });
      });
    });
  };

  this.clickOnSubscribeNewsLetterLink = function () {
    if (browser.params.region === gloabalConst.TW_REGION) {
      subscribeToNewsLetterLink.getLocation().then(function (pos) {
        browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
          subscribeToNewsLetterLink.click();
          browser.driver.sleep(gloabalConst.SLEEP_9SEC);
        });
      });
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    } else if (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
      browser.params.region === gloabalConst.FR_REGION) {
      subscribeToNewsLetterLinkEU.click();
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    }
  };

  this.clickOnHelpLink = function () {
    helpLink.getLocation().then(function (pos) {
      browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
        helpLink.click();
        browser.driver.sleep(gloabalConst.SLEEP_9SEC);
      });
    });
  };

  this.clickOnAboutLink = function () {
    if(browser.params.region === gloabalConst.TW_REGION) {
       aboutUniqloText.get(1).getLocation().then(function (pos) {
        browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
          aboutUniqloText.get(1).click();
          browser.driver.sleep(gloabalConst.SLEEP_9SEC);
        });
      });
    } else {
      aboutUniqloLink.getLocation().then(function (pos) {
        browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
          aboutUniqloLink.click();
          browser.driver.sleep(gloabalConst.SLEEP_9SEC);
        });
      });
    }
  };

  this.isCountrySelectorLinkPresent = function () {
    expect(countryPicker.isPresent()).toBe(true, 'Country Selector link not present');
  };

  this.isCountryLabelLinkPresent = function () {
    return countryPicker.getText().then(function (text) {
      var countryLabelCheck = Boolean(text);
      expect(countryLabelCheck).toBe(true, 'Country label link not present');
    });
  };

  this.getCountryLabel = function () {
    return countryPickerText.getText().then(function (text) {
      return text;
    });
  };

  this.getCountryFlagLink = function () {
    return countryFlag.getAttribute('src').then(function (link) {
      return link;
    });
  };

  this.isCountryLabelLinkDynamic = function (country) {
    countrySelector.filter(function (region) {
      return region.getText().then(function (text) {
        if (text == country) {
          return region;
        }
      })
    }).then(function (reg) {
      reg[0].getLocation().then(function (pos) {
        browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
          reg[0].click();
          browser.driver.sleep(gloabalConst.SLEEP_9SEC);
        })
      })
    });
  };

  this.isCountryLabelLinkClicked = function () {
    countryPicker.getLocation().then(function (pos) {
      browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
        browser.driver.sleep(5000);
        countryPicker.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
      });
    });
  };

  this.isCountryFlagDynamic = function () {
    expect(countrySelectorLink.isPresent()).toBe(true, 'Country flag link not dynamic');
  };


  this.isAuthenticated = function () {
    if (browser.params.region === gloabalConst.TW_REGION) {
      return (memberLogoutLink.isPresent());
    } else if (browser.params.region === gloabalConst.KR_REGION) {
      return (memberLogoutLinkKr.isPresent());
    } else if (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
      browser.params.region === gloabalConst.FR_REGION) {
      return (memberLogoutLinkEU.isPresent());
    }
  };

  this.gotoLogin = function () {
    this.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        this.clickLogin();
      } else {
        this.clickLogoutButton();
        this.clickLogin();
      }
    });
  };

  this.clickLogin = function () {
    if (browser.params.region === gloabalConst.TW_REGION && memberLoginLink.isDisplayed()) {
      memberLoginLink.getLocation().then(function (pos) {
        browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
          memberLoginLink.click();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        });
      });
    } else if (browser.params.region === gloabalConst.KR_REGION && memberLoginLinkKR.isDisplayed()) {
      memberLoginLinkKR.getLocation().then(function (pos) {
        browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
          memberLoginLinkKR.click();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        });
      });
    } else if ((browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
      browser.params.region === gloabalConst.FR_REGION) && memberLoginLinkEU.isDisplayed()) {
      memberLoginLinkEU.getLocation().then(function (pos) {
        browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
          memberLoginLinkEU.click();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        });
      });
    }
  };

  this.clickOnStoreLocator = function () {
    storeInformationLink.getLocation().then(function (pos) {
      browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
        storeInformationLink.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
      });
    });
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

  this.clickLogoutButton = function () {
    if (browser.params.region === gloabalConst.TW_REGION && memberLogoutLink.isDisplayed()) {
      memberLogoutLink.getLocation().then(function (pos) {
        browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
          memberLogoutLink.click();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        });
      });
    } else if (browser.params.region === gloabalConst.KR_REGION && memberLogoutLinkKr.isDisplayed()) {
      memberLogoutLinkKr.getLocation().then(function (pos) {
        browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
          memberLogoutLinkKr.click();
          browser.ignoreSynchronization = true;
          browser.driver.sleep(gloabalConst.SLEEP_10SEC);
          browser.driver.sleep(gloabalConst.SLEEP_10SEC);

          // Waits for an alert pops up.
          browser.driver.wait(EC.alertIsPresent(), gloabalConst.SLEEP_10SEC);
          var alertDialog = browser.driver.switchTo().alert();
          browser.driver.sleep(gloabalConst.SLEEP_10SEC);
          alertDialog.accept();
          browser.driver.sleep(gloabalConst.SLEEP_10SEC);
          browser.ignoreSynchronization = false;
        });
      });
    } else if ((browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.FR_REGION ||
      browser.params.region === gloabalConst.DE_REGION) && memberLogoutLinkEU.isDisplayed()) {
      memberLogoutLinkEU.getLocation().then(function (pos) {
        browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
          memberLogoutLinkEU.click();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        });
      });
    }
  };

  this.clickSignUpButton = function () {
    this.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        this.goToSignUpPage();
      } else {
        this.clickLogoutButton();
        this.goToSignUpPage();
      }
    });
  };

  this.goToRegisteration = function () {
    this.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        memberLoginLinkEU.getLocation().then(function (pos) {
          browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
            memberLoginLinkEU.click();
            browser.driver.sleep(gloabalConst.SLEEP_3SEC);
          });
        });
      }
    });
  };

  this.goToSignUpPage = function () {
    if (browser.params.region === gloabalConst.TW_REGION) {
      expect(signUpNowLink.isPresent()).toBe(true, 'Footer SignUp now link not present');
      signUpNowLink.getLocation().then(function (position) {
        browser.executeScript('window.scrollTo(' + position.x + ',' + position.y + ');').then(function () {
          signUpNowLink.click();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        });
      });
    } else if (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
      browser.params.region === gloabalConst.FR_REGION) {
      expect(signUpNowLinkEU.isPresent()).toBe(true, 'Footer SignUp now link not present');
      signUpNowLinkEU.getLocation().then(function (position) {
        browser.executeScript('window.scrollTo(' + position.x + ',' + position.y + ');').then(function () {
          signUpNowLinkEU.click();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        });
      });
    }
  };

  this.clickAccountButton = function () {
    if (browser.params.region === gloabalConst.TW_REGION || browser.params.region === gloabalConst.KR_REGION) {
      gdsAccountLink.getLocation().then(function (position) {
        browser.executeScript('window.scrollTo(' + position.x + ',' + position.y + ');').then(function () {
          gdsAccountLink.click();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        });
      });
      expect(signUpNowLink.isPresent()).toBe(true, 'Footer SignUp now link not present');
    } else if (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
      browser.params.region === gloabalConst.FR_REGION) {
      nonGdsAccountLink.getLocation().then(function (position) {
        browser.executeScript('window.scrollTo(' + position.x + ',' + position.y + ');').then(function () {
          nonGdsAccountLink.click();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        });
      });
    }
  };

  this.clickCountrySelectorButton = function () {
    countrySelectorLink.getLocation().then(function (position) {
      browser.executeScript('window.scrollTo(' + position.x + ',' + position.y + ');').then(function () {
        countrySelectorLink.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
      });
    });
  };

  this.checkStoreLocatorText = function () {
    storeInformationLink.getText().then(function (text) {
      expect(text.trim()).toEqual(regionalConst.STORE_LOCATOR_LINK_TEXT, 'Store locator text not correct');
    });
  };

  this.checkLoginText = function () {
    memberLoginLink.getText().then(function (text) {
      expect(text.trim()).toEqual(regionalConst.LOGIN_LINK_TEXT, 'login text not correct');
    });
  };

  this.checkSignUpLinkText = function () {
    signUpNowLink.getText().then(function (text) {
      expect(text.trim()).toEqual(regionalConst.SIGN_UP_LINK_TEXT, 'Sign up text not correct');
    });
  };

  this.checkNewsletterSubscriptionText = function () {
    subscribeToNewsLetterLink.getText().then(function (text) {
      expect(text.trim()).toEqual(regionalConst.NEWS_LETTER_SUBSCRIPTION_TEXT, 'Newsletter  text not correct');
    });
  };

  this.checkHelpLinkText = function () {
    helpLink.getText().then(function (text) {
      expect(text.trim()).toEqual(regionalConst.HELP_TEXT, 'Help text not correct');
    });
  };

  this.checkLifeToolsLinkText = function () {
    lifetoolsText.get(1).getText().then(function (text) {
      expect(text.trim()).toEqual(regionalConst.LIFETOOLS_TEXT, 'Life tools text not correct');
    });
  };

  this.checkAboutUniqloText = function () {
    aboutUniqloText.get(1).getText().then(function (text) {
      expect(text.trim()).toEqual(regionalConst.ABOUT_UNIQLO_TEXT, 'About uniqlo text not correct');
    });
  };

  this.clickOnLifeToolsLink = function () {
    lifetoolsText.get(1).getLocation().then(function (pos) {
      browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
        lifetoolsText.get(1).click();
        browser.driver.sleep(gloabalConst.SLEEP_9SEC);
      });
    });
  };

};

Footer.prototype = Page; // extend basePage...
module.exports = new Footer();