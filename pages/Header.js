'use strict';

var Page = require('./page.js');
var gloabalConst = require('../constants/constants');
var _ = require('lodash');

var Header = function () {
  this.searchBox = element(by.model('navbarController.searchText'));;
  var uniqloLogo = element(by.id('qa-logo-button'));
  var favoritesLogo = element(by.id('qa-favorites-button'));
  var shoppingCartLogo = element(by.id('qa-cart-button'));
  var searchIcon = element(by.id('qa-search-form-input'));
  var searchIconText = element(by.xpath('//label[@for=\'qa-search-form-input\']'));
  var searchIconUS = element(by.xpath('//button[@id="qa-search-button"'));
  var hamburgerMenu = element(by.id('qa-menu-button'));
  var hamburgerClose = element(by.xpath('//uni-nav-bar//button[@id=\'qa-menu-button\']'));
  var allProducts = element.all(by.repeater('subCategory in hamburgerCategoryCtrl.data.children'));
  var productsAccordion = element.all(by.repeater('item in menuCtrl.menuListWithChild'));
  var showSearchBarButton = element(by.xpath('//button[@ng-click="navbarController.onSearchBoxFocus()"]'));
  var navbarCartCount = ((browser.params.region === gloabalConst.TW_REGION) || (browser.params.region ===
    gloabalConst.KR_REGION)) ? element(by.xpath(
    '//button[@id="qa-cart-button"]//span[@class="uni-nav-button__counter"]')) : element(by.xpath(
    '//button[@id="qa-cart-button"]//span[@class="uni-nav-button__counter ng-binding"]'));
  var navbarL1pageCount = element(by.xpath('//span[@ng-if="navButtonController.region !== \'us\' && iconClass!==\'uni-icon-x\' && isCartButton && navButtonController.getNumItemsInCart() > 0"]'));
  var myFavCount = ((browser.params.region === gloabalConst.TW_REGION) || (browser.params.region === gloabalConst.KR_REGION)) ?
    element(by.xpath(
      '//button[@id="qa-favorites-button"]//span[@class="uni-nav-button__counter"]')) : element(by.xpath(
      '//button[@id="qa-favorites-button"]//span[@class="uni-nav-button__counter ng-binding"]'));
  var cartCount;
  var favCount;
  var clearSearchButton = element(by.className('uni-search-clear-button'));
  var cookieNotification = (_.includes(gloabalConst.EU_REGIONS, browser.params.region)) ? element(by.className('uni-cookie-notification')) : element(by.xpath(
    '//uni-cookie-notification//section[@class="uni-cookie-notification"]'));
  var privatePolicyLink = element(by.xpath('//uni-cookie-notification//a'));
  var cookieNotificationTitle = element(by.className('uni-cookie-notification__title'));
  var searchCloseButton = element(by.className('uni-close-button'));
  var searchInputField = element(by.xpath('//form//button[@ng-show="navbarController.searchFormVisible"]'));
  if (_.includes(gloabalConst.EU_US_REGIONS, browser.params.region)) {
    productsAccordion = element.all(by.repeater('menuItem in menuCtrl.getNavItems()'));
    showSearchBarButton = element(by.xpath('//button[@id="qa-search-button"]'));
    hamburgerClose = element(by.xpath('//button[@id="qa-menu-button"][@close-identifier="true"]'));
  }

  this.isUniqloLogoPresent = function () {
    expect(uniqloLogo.isPresent()).toBe(true, 'Uniqlo logo not present');
    this.clickUniqloLogo();
  };

  this.isFavoritesLogoPresent = function () {
    expect(favoritesLogo.isPresent()).toBe(true, 'Favorites logo not present');
    favoritesLogo.isPresent().then(function(value) {
    if (value) {
        favoritesLogo.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        expect(browser.driver.getCurrentUrl()).toContain('/wishlist','Redirection to wishlist not done');
        browser.navigate().back();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
      }
    });
  };


  this.isShoppingCartLogoPresent = function () {
    expect(shoppingCartLogo.isPresent()).toBe(true, 'Shopping cart logo not present');
    shoppingCartLogo.isPresent().then(function (status) {
      if (status) {
        shoppingCartLogo.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        if (_.includes(gloabalConst.EU_REGIONS, browser.params.region)) {
          expect(browser.driver.getCurrentUrl()).toContain('/cart','Redirection to cart page not done');
        }
        browser.navigate().back();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
      }
    });
  };

  this.isSearchIconPresent = function () {
    expect(searchIcon.isPresent()).toBe(true, 'Search icon not present');
    searchIcon.isPresent().then(function (value) {
      if (value) {
        showSearchBarButton.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        expect(searchInputField.isDisplayed()).toBe(true, 'Search form not present');
        searchCloseButton.click();
      }
    });
  };

  this.isSearchIconPresentUs = function () {
    expect(searchIconUS.isPresent()).toBe(true, 'Search icon not present');
    searchIconUS.isPresent().then(function (value) {
      if (value) {
        showSearchBarButton.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        expect(searchInputField.isDisplayed()).toBe(true, 'Search form not present');
        searchCloseButton.click();
      }
    });
  };
  
  this.isHamburgerMenuPresent = function () {
    expect(hamburgerMenu.isDisplayed()).toBe(true, 'Hamburger menu not present');
    hamburgerMenu.isDisplayed().then(function () {
      hamburgerMenu.click();
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
      hamburgerClose.click();
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    });
  };

  this.isHamburgerClosePresent = function () {
    expect(hamburgerClose.isDisplayed()).toBe(true, 'Hamburger close not present');
  };

  this.clickHamburgerMenu = function () {
    hamburgerMenu.isPresent().then(function() {
      hamburgerMenu.click();
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    });
  };

  this.clickHamburgerClose = function () {
    hamburgerClose.click();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

  this.clickFirstProduct = function () {
    allProducts.first().click();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

  this.clickUniqloLogo = function () {
    return uniqloLogo.click()
      .then(function () {
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
      })
  };
  this.isCookieNotificationPresent = function () {
    cookieNotification.isDisplayed().then(function () {});
    expect(cookieNotification.isDisplayed()).toBe(true, 'Cookie Notification not present');
  };

  this.checkForNoCookieNotification = function () {
    expect(cookieNotification.isPresent()).toBe(false, 'Cookie Notification is present');
  };

  this.checkCssPropertyForCookie = function () {
    cookieNotification.getCssValue('background').then(function (backgroundValue) {
      expect(backgroundValue).toBe('rgb(99, 98, 98) none repeat scroll 0% 0% / auto padding-box border-box');
    });
    cookieNotification.getCssValue('color').then(function (textColor) {
      expect(textColor).toBe('rgba(255, 255, 255, 1)');
    });
    privatePolicyLink.getCssValue('color').then(function (textColor) {
      expect(textColor).toBe('rgba(255, 255, 255, 1)');
    });
    privatePolicyLink.getCssValue('text-decoration').then(function (textDeco) {
      expect(textDeco).toBe('underline');
    });
    cookieNotificationTitle.getCssValue('text-transform').then(function (textTrasform) {
      expect(textTrasform).toBe('uppercase');
    });
    cookieNotification.getCssValue('font-family').then(function (fontface) {
      expect(fontface).toBe('\"Uniqlo Pro Regular\", Roboto, \"Droid Sans\", HiraKakuProN-W3, sans-serif');
    });
  };
  this.checkCount = function () {
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    return navbarL1pageCount.isPresent();
  };
  this.clickCookiePrivatePolicyLink = function () {
    privatePolicyLink.click();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    expect(browser.driver.getCurrentUrl()).toContain('/company/privacy_policy.html');
  };

  this.clickNthProduct = function (index) {
    allProducts.get(index).element(by.xpath(
      '/html/body/ion-content/div/div[2]/div[4]/uni-accordion/div/div[2]/div/uni-hamburger-category/div[1]')).click();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

  this.clickNthCategory = function (index) {
    productsAccordion.get(index).getLocation().then(function (pos) {
      browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
        productsAccordion.get(index).click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
      });
    });
  };
  this.clickNthSubCategory_EU = function (index) {
    element.all(by.xpath('//li[@ng-repeat="menuItem in menuCtrl.getNavItems()"]')).get(index).click();

    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

  this.goToWishList = function () {
    favoritesLogo.getLocation().then(function (pos) {
      browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
        favoritesLogo.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        expect(browser.driver.getCurrentUrl()).toContain('/wishlist','Redirection to wishlist not done');
      });
    });
  };

  this.goToCart = function () {
    shoppingCartLogo.getLocation().then(function (pos) {
      browser.executeScript('window.scrollTo(' + pos.x + ',' + pos.y + ');').then(function () {
        shoppingCartLogo.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
      });
    });
  };

  this.showSearch = function () {
    showSearchBarButton.click().then(function () {
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    });
  };

  this.setCartCount = function () {
    navbarCartCount.isPresent().then(function (status) {
      if (status) {
        navbarCartCount.getText().then(function (count) {
          cartCount = parseInt(count);
        });
      } else {
        cartCount = 0;
      }
    });
  };

  this.getCartCount = function () {
    return cartCount;
  };

  this.checkCartCount = function (quantity) {
    if (browser.params.region === gloabalConst.TW_REGION) {
      navbarCartCount.getText().then(function (count) {
        expect(parseInt(count)).toEqual((parseInt(cartCount) + quantity), 'Cart Count is not correct');
      });
    } else if (browser.params.region === gloabalConst.KR_REGION) {
      navbarCartCount.getText().then(function (count) {
        expect(parseInt(count)).toEqual((parseInt(cartCount) + quantity), 'Cart Count is not correct');
      });
    } else {
      navbarCartCount.getText().then(function (count) {
        expect(parseInt(count)).toEqual(parseInt(quantity), 'Cart Count is not correct');
      });
    }
  };

  this.searchItem = function (item) {
    searchIcon.sendKeys(item);
    searchIcon.sendKeys(protractor.Key.ENTER);
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

  this.navbarCartQuantity = function (cartCount) {
    navbarCartCount.getText().then(function (count) {
      expect(parseInt(count)).toEqual(cartCount, 'Cart Count is not correct');
    });
  };

  this.setFavCount = function () {
    myFavCount.isPresent().then(function (status) {
      if (status) {
        myFavCount.getText().then(function (count) {
          favCount = count;
        });
      } else {
        favCount = 0;
      }
    });
  };

  this.checkFavCount = function (quantity) {
    myFavCount.isPresent().then(function (status) {
      if (status) {
        myFavCount.getText().then(function (count) {
          expect(parseInt(count)).toEqual((parseInt(favCount) + parseInt(quantity)),
            'Favorites Count is not correct');
        });
      }
    });
  };

  this.checkFavCountAfterDeletion = function (quantity) {
    if (favCount > 1) {
      myFavCount.getText().then(function (count) {
        expect(parseInt(count)).toEqual((parseInt(favCount) - parseInt(quantity)),
          'Favorites Count is not correct');
      });
    } else {
      expect(myFavCount.isPresent()).toBe(false, 'Favorites Count is not correct');
    }
  };

  this.checkNoFavCount = function () {
    expect(myFavCount.isPresent()).toBe(false, 'Favorites Count is not correct');
  };

  this.clearSearch = function () {
    clearSearchButton.click().then(function () {
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    });
  };
};

Header.prototype = Page; // extend basePage...
module.exports = new Header();