'use strict';

var Page = require('./page.js');
var gloabalConst = require('../constants/constants');
var regionalConst = require('../constants/' + browser.params.region + '-constants');

var Search_Page = function () {
  var searchTitle = element(by.className('search-page__sub-title'));
  var productList = element(by.className('uni-product-list'));
  var allProducts = element.all(by.repeater('product in productListCtrl.productData'));
  var seeMoreButton = element(by.xpath('//button[@ng-click=\'productListCtrl.viewMore()\']'));
  var noResultsText = element(by.className('search-page__search-term-no-results'));

  this.pageLoaded = this.and(
    this.isVisible($('ui-view div.search-page__title-section div.search-page__title')) || this.isVisible($(
      'ui-view div.search-page__title-section div.search-page__search-term-no-results'))
  );

  this.getSearchPageTitle = function () {
    return searchTitle.getText().then(function (text) {
      return text;
    });
  };

  this.waitForProductList = function () {
    var until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(productList), parseInt(gloabalConst.SLEEP_10SEC),
      'Product list taking too long to appear in the DOM');
  };

  this.clickNthProduct = function (index) {
    allProducts.get(index).click();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

  this.clickfirstProduct = function (index) {
    return allProducts.get(index).getLocation().then(function (position) {
      return browser.executeScript('window.scrollTo(' + (position.x - 100) + ',' + (position.y - 100) + ');').then(function () {
        allProducts.get(index).click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        return position;
      });
    });
  };

  this.verifyAnchorPosition = function (index,previousPosition) {
    allProducts.get(index).getLocation().then(function (position) {
      expect(previousPosition.x).toEqual(position.x, 'X coordinate of current position matches with previous position');
      expect(previousPosition.y).toEqual(position.y, 'Y coordinate of current position matches with previous position');
    });
  };

  this.isCountCorrectTemp = function (total) {
    var totalProductCount;
    if (total > gloabalConst.PRODUCT_LIMIT) {
      expect(seeMoreButton.isPresent() && seeMoreButton.isDisplayed()).toBe(true,
        'See more button is not displayed');
    } else {
      expect(seeMoreButton.isPresent()).toBe(false, 'See more button is displayed');
    }
    searchTitle.getText().then(function (text) {
      var numbersInTitle = text.match(/\d+/g);
      if (numbersInTitle.length > 1) {
        if (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
          browser.params.region === gloabalConst.FR_REGION) {
          totalProductCount = parseInt(numbersInTitle[0]);
        } else {
          totalProductCount = parseInt(numbersInTitle[1]);
        }
      } else {
        totalProductCount = parseInt(numbersInTitle[0]);
      }
      expect(totalProductCount).toEqual(total, 'Count displayed is wrong');
    });
  };

  this.isCountCorrect = function (total) {
    var totalProductCount;
    var productListcount;
    allProducts.count().then(function (count) {
      if (count > 0) {
        productListcount = count;
        var extra = total;
        if (total > regionalConst.SEARCH_PRODUCT_LIMIT) {
          if (total < regionalConst.SEARCH_PRODUCT_CHECKING_LIMIT) {
            while (productListcount < total) {
              browser.waitForAngular();
              extra = extra - gloabalConst.PRODUCT_LIMIT;
              if (extra > gloabalConst.PRODUCT_LIMIT) {
                productListcount = productListcount + gloabalConst.PRODUCT_LIMIT;
              } else {
                productListcount += extra;
              }
            }
            expect(productListcount).toEqual(total, 'Count did not match');
          } else {
            if (browser.params.region !== gloabalConst.TW_REGION) {
              expect(seeMoreButton.isPresent() && seeMoreButton.isDisplayed()).toBe(true,
                'See more button is not displayed');
            }
          }
        } else {
          if (browser.params.region !== gloabalConst.TW_REGION) {
            expect(seeMoreButton.isPresent()).toBe(false, 'See more button is displayed');
          }
        }
      }
    });
    searchTitle.getText().then(function (text) {
      var numbersInTitle = text.match(/\d+/g);
      if (numbersInTitle.length > 1) {
        if (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
          browser.params.region === gloabalConst.FR_REGION) {
          totalProductCount = parseInt(numbersInTitle[0]);
        } else {
          totalProductCount = parseInt(numbersInTitle[1]);
        }
      } else {
        totalProductCount = parseInt(numbersInTitle[0]);
      }
      expect(totalProductCount).toEqual(total, 'Count displayed in title is wrong');
    });
  };

  this.isNoResultsPresent = function () {
    expect(noResultsText.isPresent && noResultsText.isDisplayed()).toBe(true, 'No results message not found');
  };

  this.checkIfNoItemsFound = function () {
    this.isNoResultsPresent();
    expect(allProducts.count()).toBe(0, 'Products are listed wrongly');
  };

  this.checkTitle = function (searchTerm) {
    searchTitle.getText().then(function (text) {
      expect(text).toContain(searchTerm, 'Title of search results is not belongs to ' + searchTerm);
    });
  };
};

Search_Page.prototype = Page; // extend basePage...
module.exports = new Search_Page();