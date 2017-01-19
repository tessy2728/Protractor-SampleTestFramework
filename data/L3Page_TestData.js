var department = require('./department');
var util = require('../utility/util');
var regionalConstants = require('../constants/' + browser.params.region + '-constants');
var gloabalConst = require('../constants/constants');

var L3PageTestData = function () {
  var products = [];
  var selectedProduct = {};
  var productSKUList = [];
  var reviewRating;

  this.addMenProdToCartData = {
    mainCategory: "Men",
    categoryName: regionalConstants.MEN_CATEGORY,
    slug: regionalConstants.MEN_SLUG_PATH,
    categoryIndex: 2,
    subCategoryIndex: 2,
    productIndex: 0
  };

  this.addWomenProdToCartData = {
    mainCategory: "Women",
    categoryName: regionalConstants.WOMEN_CATEGORY,
    slug: regionalConstants.WOMEN_SLUG_PATH,
    categoryIndex: 0,
    subCategoryIndex: 0,
    productIndex: 0
  };

  this.addKidsProdToCartData = {
    mainCategory: "Kids",
    categoryName: regionalConstants.KIDS_CATEGORY,
    categoryIndex: 1,
    subCategoryIndex: 2,
    productIndex: 0
  };

  this.addBabyProdToCartData = {
    mainCategory: "Baby",
     categoryName: regionalConstants.BABY_CATEGORY,
    categoryIndex: 0,
    subCategoryIndex: 0,
    productIndex: 0
  };

  this.addMenNoSizeCartData = {
    mainCategory: "Men",
     categoryName: regionalConstants.MEN_CATEGORY,
     slug: regionalConstants.MEN_SLUG_PATH,
    categoryIndex: 4,
    subCategoryIndex: 3,
    productIndex: 1
  };

  this.addWomenHemmingCartData = {
    mainCategory: "Women",
    categoryName: regionalConstants.WOMEN_CATEGORY,
    slug: regionalConstants.WOMEN_SLUG_PATH,
    categoryIndex: 2,
    subCategoryIndex: 0,
    productIndex: 1,
    hemmingSize:'60 cm'
  };

  this.addMenHemmingCartData = {
    mainCategory: "Men",
    categoryName: regionalConstants.MEN_CATEGORY,
    slug: regionalConstants.MEN_SLUG_PATH,
    categoryIndex: 3,
    subCategoryIndex: 2,
    productIndex: 1,
    hemmingSize:'60 cm'
  };


  this.loginCreds = {
    staging:{
      username: 'jechoi6@lotte.com',
      password: 'test135790*'
    },
    production:{
      username: 'naaeri',
      password: '@#kr002319'
    }
  }

  this.registartionDetails = {
      email: util.generateRandomEmail(),
      firstName: 'Tessy',
      lastName: 'Thomas',
      password: 'hope4dbest@1',
      confirmPassword: 'hope4dbest@1',
      phone: '0987654323',
      gender: 'female',
      dobYear: '1989',
      dobMonth: '04',
      dobDay: '06'
    };

  this.getProducts = function () {
    return products;
  };

  this.setProducts = function (list) {
    products = list;
  };

  this.getSelectedProduct = function () {
    return selectedProduct;
  };

  this.setSelectedProduct = function (product) {
    selectedProduct = product;
  };

  this.getProductSKUList =function () {
    return productSKUList;
  };

  this.setProductSKUList = function (productSKUs) {
    productSKUList = productSKUs;
  };

  this.getCategoryId = function(REGION, productData) {
    var dept = department.getDepartmentByName(productData.categoryName, REGION);
    var categoryCode = dept.children[productData.categoryIndex].children[productData.subCategoryIndex].id;
    return categoryCode;
  };

  this.getCategoryIdBySlug = function(REGION, productData) {
    var dept = department.getDepartmentBySlug(productData.slug, REGION);
    if(browser.params.region === gloabalConst.KR_REGION){
      var categories = [];
      if(dept.children[productData.categoryIndex].children.length >=1){
          for(var i = 0;i < dept.children[productData.categoryIndex].children.length;i++) {
            categories.push(dept.children[productData.categoryIndex].children[i].id)
          }
          return categories[productData.subCategoryIndex];
      }
    }else{
          var categoryCode = dept.children[productData.categoryIndex].children[productData.subCategoryIndex].id;
          return categoryCode;
    }
  };

  this.setReviewRating = function (rating) {
    reviewRating = rating;
  };

  this.getReviewRating = function () {
    return reviewRating;
  };
};

module.exports = new L3PageTestData();