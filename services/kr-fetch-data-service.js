var apiService = require('./api-service');
var krApiService = require('./kr-api-service');
var gloabalConst = require('../constants/constants');

var l3PageTestData = require('../data/L3Page_TestData');
var util = require('../utility/util');
var productsData = {
  availableProducts: [],
  unavailableProducts: [],
  productCount: null,
  catchCopy:null,
  availableSizes:[],
  availableColors: [],
  status: false,
  productId: null,
  productName: null,
  productIndex: 0
};
var params = {
  limit: gloabalConst.PRODUCT_LIMIT,
  order: gloabalConst.ASCENDING,
  page: 1,
  sort: gloabalConst.SORT_RECOMMENTED,
  withChild: true
};

function getProductsInfo(index, category, productType) {
  params.category = category;
  return apiService.getProductList(params, browser.params.region).then(function (response) {
    if (response.code !== 1004 && response.total > 0) {
      productsData.liststatus = true;
      l3PageTestData.setProducts(response.records);    
      productsData.productCount = response.total;
      index = findProductOfType(response.records, index, productType);
      productsData.productIndex = index;
      l3PageTestData.setReviewRating(l3PageTestData.getProducts()[index].reviewRating);
      return getProductsDetails(l3PageTestData.getProducts()[index].id).then(function(){
        return productsData;
      });
    } else {
        productsData.liststatus = false;
        productsData.status = false;
        return productsData;
    }
  });
};


function getSearchResults(searchTerm) {
  var params = {
      order: gloabalConst.DESCENDING,
      page: 1,
      q: searchTerm,
      sort: gloabalConst.SORT_NEW
    };
    return apiService.searchItem(params, browser.params.region).then(function (searchResults) {
      if (searchResults.code !== 1004) {
        searchResults.liststatus = true;
      } else {
         searchResults.liststatus = false;
      }
      return searchResults;
    });   
};

function findProductOfType(list, productIndex, productType) {
    if(productType === gloabalConst.HEMMING_PRODUCT) {
       list.forEach(function(listItem, index) {
        if(listItem.hemmingData.length > 1){
          productIndex = index;
        }
      }); 
    } else if(productType === gloabalConst.NO_SIZE_PRODUCT) {
       list.forEach(function(listItem, index) {
        if(listItem.sizes.length > 1){
          productIndex = index;
        }
      }); 
    } else if(productType === gloabalConst.NORMAL_PRODUCT) {
       list.forEach(function(listItem, index) {
        if(listItem.colors.length > 1 && listItem.sizes.length > 1 && listItem.hemmingData.length == 1){
          productIndex = index;
        }
      });
    }
    return productIndex;
};

module.exports = {
  getProductsInfo: getProductsInfo,
  getSearchResults: getSearchResults
};