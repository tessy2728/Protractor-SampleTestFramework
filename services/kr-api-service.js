var apiconfig = require('../config/api-config');
var request = require('request-promise');

//The dispCdLv1, dispCdLv2, dispCdLv3 are the three category levells
//Sample API : 
//"http://www.uniqlo.com/tw/store/gcx/searchProducts.do?format=json&dispCdLv1=001&dispCdLv2=001002&dispCdLv3=001002003"

function getStock (productId, REGION) {
  var options = {
    method: 'get',
    uri: apiconfig[REGION].getStockAjax+""+productId
  };
  return request(options).then(function (data) {
  	return JSON.parse(data);
  }).catch(function (err) {
      console.log('request failed'+ err);
      return JSON.parse(err.error);
  });
};

function checkForDuplicate (goodsNo, itemNo, memberNo, REGION) {
  var options = {
    method: 'get',
    uri: apiconfig[REGION].checkForDuplicate + "?memberNo=" + memberNo + "&goodsNo=" + goodsNo + "&itemNo=" + itemNo,
    headers: {
        'User-Agent': apiconfig.userAgent
    }
  };

  return request(options).then(function (data) {
  	return JSON.parse(data);
  }).catch(function (err) {
      console.log('request failed'+err);
      return JSON.parse(err.error);
  });
};

function getMemberId (timeStamp, REGION) {
  var options = {
    method: 'get',
    uri: apiconfig[REGION].getMemberId,
    qs: {
    	timeStamp: timeStamp
    },
    headers: {
        'User-Agent': apiconfig.userAgent
    }
	};
	return request(options).then(function (data) {
	  	return JSON.parse(data);
	  }).catch(function (err) {
      console.log('request failed'+err);
      return JSON.parse(err.error);
   });
 };

module.exports = {
  getStock: getStock,
  checkForDuplicate: checkForDuplicate,
  getMemberId: getMemberId
};