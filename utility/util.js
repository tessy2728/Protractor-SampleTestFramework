'use strict';

var gloabalConst = require('../constants/constants');

var Util = function () {
  var euRegions = [gloabalConst.FR_REGION, gloabalConst.DE_REGION, gloabalConst.EU_REGION];
  var asiaRegion = [gloabalConst.KR_REGION, gloabalConst.TW_REGION];

  this.isAsiaRegion = function () {
    if (asiaRegion.indexOf(browser.params.region) > -1) {
      return true;
    }
    return false;
  };

  this.isEuRegion = function () {
    if (euRegions.indexOf(browser.params.region) > -1) {
      return true;
    }
    return false;
  };

  this.getObjects = function (obj, key, val) {
    var objects = [];
    var i;
    for (i in obj) {
      if (!obj.hasOwnProperty(i)) {
        continue;
      }
      if (typeof obj[i] === 'object') {
        objects = objects.concat(this.getObjects(obj[i], key, val));
      } else {
        if (i === key && obj[key] === val) {
          objects.push(obj);
        }
      }
    }
    return objects;
  };

  this.getIndexOfItem = function (array, item) {
    var index = 0;
    var i;
    for (i = 0; i < array.length; i++) {
      if (array[i] === item) {
        return index;
      }
      index++;
    }
  };
  this.getIndexOfItemInArrayByKey = function (array, key, value) {
    var index = 0;
    var i;
    for (i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return index;
      }
      index++;
    }
  };

  this.sortObject = function (o) {
    var key;
    var a = [];
    for (key in o) {
      if (o.hasOwnProperty(key)) {
        a.push(key);
      }
    }
    a.sort();
    return a;
  };

  this.checkItemExistsInArray = function (array, value) {
    var i;
    for (i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return true;
      }
    }
    return false;
  };

  this.checkItemExists = function (array, itemId, colorText, sizeText) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === itemId && array[i].colorText === colorText && (array[i].sizeText === sizeText || array[i]
          .sizeText === 'No Control')) {
        return true;
      }
    }
    return false;
  };

  this.incrementQuantity = function (array, itemId, colorText, sizeText) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === itemId && array[i].colorText === colorText && array[i].sizeText === sizeText) {
        array[i].quantity = array[i].quantity + 1;
      }
    }
  };

  this.getItem = function (array, itemId) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === itemId) {
        return array[i];
      }
    }
  };

  this.generateRandomEmail = function () {
    /* The following block generates a random email string */
    var allowedChars = 'abcdefghiklmnopqrstuvwxyz';
    var stringLength = 8;
    var randomstring = '';
    for (var i = 0; i < stringLength; i++) {
      var rnum = Math.floor(Math.random() * allowedChars.length);
      randomstring += allowedChars.substring(rnum, rnum + 1);
    }
    // Append a domain name
    randomstring += '@domainname.com';
    return randomstring;
  };

  this.generateRandomEmailForEu = function () {
    /* The following block generates a random email string */
    var allowedChars = 'abcdefghiklmnopqrstuvwxyz';
    var stringLength = 8;
    var randomstring = '';
    for (var i = 0; i < stringLength; i++) {
      var rnum = Math.floor(Math.random() * allowedChars.length);
      randomstring += allowedChars.substring(rnum, rnum + 1);
    }
    // Append a domain name
    //randomstring += '@domainname.com';
    var email = 'qbautomationtest+' + randomstring + '@gmail.com';
    return email;
  };

  this.hasObject = function (list, obj) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  };
};

module.exports = new Util();