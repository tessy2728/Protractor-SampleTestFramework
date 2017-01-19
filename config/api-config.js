var runConfig = require('./run-env-config');
var gloabalConst = require('../constants/constants');
var baseURL = runConfig[process.env[gloabalConst.TEST_ENVIRONMENT]].baseURL || runConfig[globalConst.PRODUCTION].baseURL;
module.exports = {
	common:{
		getCategoryTree: (baseURL) + '/spa-catalog/categories/tree?depth=3',
		getProductList: (baseURL) + '/spa-catalog/products',
		getLimitedOfferList: (baseURL) + '/spa-catalog/products/summary'
	},
	tw: {
		gdsSearchProducts: (baseURL) + '/store/gcx/searchProducts.do?format=json',
		apiGetProductInfo: (baseURL) + '/store/ApiGetProductInfo.do?format=json',
    	getProductsCatalog: (baseURL) + '/spa-catalog/products/byslug',
    	searchItem: (baseURL) + '/esearch',
    	getGlobalTemplate: (baseURL) + '/spa-cms/content/tw/zh/global/template.json'
	},
	kr: {
		gdsSearchProducts: (baseURL) + '/store/gcx/searchProducts.do?format=json',
		apiGetProductInfo: (baseURL) + '/store/ApiGetProductInfo.do?format=json',
    	getProductsCatalog: (baseURL) + '/spa-catalog/products/byslug',
    	searchItem: (baseURL) + '/esearch',
    	getGlobalTemplate: (baseURL) + '/spa-cms/content/kr/ko/global/template.json',
    	getStockAjax: 'http://uqapi.lecs.com/ext/goods/stockAjax.lecs?productID=',
    	checkForDuplicate: 'http://mlecs.uniqlo.kr/ext/cart/chkDuplicateAjax.lecs',
    	getMemberId: 'http://mlecs.uniqlo.kr/ext/member/sessionCartDataAjax.lecs'
	},
	eu: {
		gdsSearchProducts: (baseURL) + '/store/gcx/searchProducts.do?format=json',
		apiGetProductInfo: (baseURL) + '/spa-demandware/products/',
        getProductsCatalog: (baseURL) + '/spa-catalog/products/',
        searchItem: (baseURL) + '/spa-catalog/proxy/search',
        getGlobalTemplate: (baseURL) + '/spa-cms/content/eu/en/global/template.json'	
	},
	fr: {
		gdsSearchProducts: (baseURL) + '/store/gcx/searchProducts.do?format=json',
		apiGetProductInfo: (baseURL) + '/spa-demandware/products/',
        getProductsCatalog: (baseURL) + '/spa-catalog/products/',
        searchItem: (baseURL) + '/spa-catalog/proxy/search',
        getGlobalTemplate: (baseURL) + '/spa-cms/content/fr/fr/global/template.json'	
	},
	de: {
		gdsSearchProducts: (baseURL) + '/store/gcx/searchProducts.do?format=json',
		apiGetProductInfo: (baseURL) + '/spa-demandware/products/',
        getProductsCatalog: (baseURL) + '/spa-catalog/products/',
        searchItem: (baseURL) + '/spa-catalog/proxy/search',
        getGlobalTemplate: (baseURL) + '/spa-cms/content/de/de/global/template.json'	
	},
	userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us)' +
			   ' AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'
}