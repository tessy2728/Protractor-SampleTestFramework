'use strict';

var l1Page = require('../pages/L1_Page');
var headerPage = require('../pages/Header');
var searchPage = require('../pages/Search_Page');
var krConst = require('../constants/kr-constants');
var gloabalConst = require('../constants/constants');
var getProductsInfoService = require('../services/kr-fetch-data-service');
var noOfProducts;
var searchField = element(by.id('qa-search-form-input'));

require('jasmine-expect');

describe('Search page functionality', function () {
  var searchResultByNumber;
  var searchResultByKeyword;
  var searchResultByKrKeyword;

  beforeAll(function (done) {
    l1Page.to();
    expect(l1Page.at()).toBeTruthy();
    l1Page.checkIfDepartmentTabsDisplayedKr();
    browser.driver.wait(function () {
      getProductsInfoService.getSearchResults(krConst.SEARCH_TERM_NUMBER).then(function (response) {
        searchResultByNumber = response;
        getProductsInfoService.getSearchResults(krConst.SEARCH_TERM_ENGLISH).then(function (response) {
          searchResultByKeyword = response;
          getProductsInfoService.getSearchResults(krConst.SEARCH_TERM_KOREAN).then(function (
            response) {
            searchResultByKrKeyword = response;
            done();
          });
        });
      });
      return true;
    });
  });

  it('Search item by number', function () {
    browser.driver.sleep(gloabalConst.SLEEP_6SEC);
    browser.waitForAngular();
    noOfProducts = searchResultByNumber.total;
    headerPage.showSearch();
    searchField.clear();
    headerPage.searchItem(krConst.SEARCH_TERM_NUMBER);
    browser.waitForAngular();
    if (noOfProducts > 0) {
      searchPage.waitForProductList();
      searchPage.isCountCorrect(noOfProducts);
      searchPage.checkTitle(krConst.SEARCH_TERM_NUMBER);
    } else {
      searchPage.checkIfNoItemsFound();
    }
  });

  it('Search item by keyword', function () {
    noOfProducts = searchResultByNumber.total;
    headerPage.showSearch();
    if (noOfProducts > 0) {
      searchField.clear();
    }
    noOfProducts = searchResultByKeyword.total;
    headerPage.searchItem(krConst.SEARCH_TERM_ENGLISH);
    browser.waitForAngular();
    if (noOfProducts > 0) {
      searchPage.waitForProductList();
      searchPage.isCountCorrect(noOfProducts);
      searchPage.checkTitle(krConst.SEARCH_TERM_ENGLISH);
    } else {
      searchPage.checkIfNoItemsFound();
    }
  });

  it('Search item by korean text', function () {
    noOfProducts = searchResultByKeyword.total;
    headerPage.showSearch();
    searchField.clear();
    if (noOfProducts > 0) {
      searchField.clear();
    }
    noOfProducts = searchResultByKrKeyword.total;
    headerPage.searchItem(krConst.SEARCH_TERM_KOREAN);
    browser.waitForAngular();
    if (noOfProducts > 0) {
      searchPage.waitForProductList();
      searchPage.isCountCorrect(noOfProducts);
      searchPage.checkTitle(krConst.SEARCH_TERM_KOREAN);
    } else {
      searchPage.checkIfNoItemsFound();
    }
  });
  afterAll(function () {
    browser.driver.executeScript('sessionStorage.clear()');
  });
});