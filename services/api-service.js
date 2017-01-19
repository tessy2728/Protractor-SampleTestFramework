var apiconfig = require('../config/api-config');
var request = require('request-promise');

//The dispCdLv1, dispCdLv2, dispCdLv3 are the three category levells
//Sample API : 
//"http://www.uniqlo.com/tw/store/gcx/searchProducts.do?format=json&dispCdLv1=001&dispCdLv2=001002&dispCdLv3=001002003"

function searchProducts (dispCdLv1, dispCdLv2, dispCdLv3, REGION) {
  var options = {
    method: 'get',
    uri: apiconfig[REGION].gdsSearchProducts,
    qs: {
    	disp_cd_Lv1: dispCdLv1,
    	disp_cd_Lv2: dispCdLv2,
    	disp_cd_Lv3: dispCdLv3
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
}

//The product is the product ID
//Sample API : 
//"http://www.uniqlo.com/tw/store/ApiGetProductInfo.do?format=json&product=163514"

function getProductInfo (productId, REGION) {
  var options = {
    method: 'get',
    uri: apiconfig[REGION].apiGetProductInfo,
    qs: {
    	product: productId,
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
}

//Get product list passing categoryID, limit, sort order
/*
@params :{
        category:'001002001',
        limit:20,
        order:"asc",
        page:1,
        sort:"recommendation",
        withChild:true
        }
*/

function getProductCatalogInfo (productId, REGION) {
  var options = {
    method: 'get',
    uri: apiconfig['common'].getProductList+"/"+productId,
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
}

function getProductList (params,REGION) {
  var options = {
    method: 'get',
    uri: apiconfig['common'].getProductList,
    qs: params,
    headers: {
      'User-Agent': apiconfig.userAgent
    }
  };
  return request(options).then(function (data) {
  	return JSON.parse(data);
  }).catch(function (err) {
      console.log(err.error);
      return JSON.parse(err.error);
  });
}

//Get the limite offer products
function getLimitedOfferList (params,REGION) {
  var url;
  if(params.flag2) {
    url = apiconfig['common'].getLimitedOfferList+ '?ancestor='+ params.ancestor +'&flag='+params.flag1+'&flag='+params.flag2+'&limit='+params.limit;
  }
  else
    url = apiconfig['common'].getLimitedOfferList+ '?ancestor='+ params.ancestor +'&flag='+params.flag1+'&limit='+params.limit;
  var options = {
    method: 'get',
    uri: url,
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

//Get the limite offer products
function getLimitedOfferProductList (params,REGION) {
  var url = apiconfig['common'].getProductList;
  params.categories.forEach(function(category, index){
      if(index === 0)
        url = url + '?category='+ category;
      else
        url = url + '&category='+ category;
  });
  if(params.flag2) {
    url =  url + '&flag='+params.flag1+'&flag='+params.flag2+'&limit=' + params.limit + '&order=' + params.order + '&page=' + params.page + '&sort=' + params.sort;
  }
  else
    url =  url + '&flag='+params.flag1+'&limit=' + params.limit + '&order=' + params.order + '&page=' + params.page + '&sort=' + params.sort;
  var options = {
    method: 'get',
    uri: url,
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

//Get products catalog passing productId
function getProductsCatalog (productId,REGION) {
  var options = {
    method: 'get',
    uri: apiconfig[REGION].getProductsCatalog+"/"+productId,
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
}

//Get catalogTree for different countries
function getCatalogTree (REGION) {
  var options = {
    method: 'get',
    uri: apiconfig['common'].getCategoryTree,
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
}

//Search Item
function searchItem (params, REGION) {
  var options = {
    method: 'get',
    uri: apiconfig[REGION].searchItem,
    qs: params,
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
}

function getGlobalTemplate (REGION) {
  var options = {
    method: 'get',
    uri: apiconfig[REGION].getGlobalTemplate,
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
	searchProducts: searchProducts,
	getProductInfo: getProductInfo,
	getCatalogTree: getCatalogTree,
  getProductList: getProductList,
  getProductsCatalog: getProductsCatalog,
  getProductCatalogInfo: getProductCatalogInfo,
  searchItem: searchItem,
  getLimitedOfferList: getLimitedOfferList,
  getGlobalTemplate: getGlobalTemplate,
  getLimitedOfferProductList: getLimitedOfferProductList
};