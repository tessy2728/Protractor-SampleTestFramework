'use strict';

var Page = require('./page.js');
var department = require('../data/department');
var runConfig = require('../config/run-env-config');
var gloabalConst = require('../constants/constants');
var regionalConstants = require('../constants/' + browser.params.region + '-constants');
var _ = require('lodash');
var halfLinkClass = _.indexOf(gloabalConst.EU_REGIONS, browser.params.region) !== -1 &&
  process.env.TEST_ENVIRONMENT === gloabalConst.PRODUCTION ?
  'owl-stage-outer' : 'uni-half-links';
var L1Page = function () {
var runConfig = require('../config/run-env-config');
var womenThroughHalfLinks = element(by.xpath('//div[@ng-class="iconLinkController.updateIconLinkContentStyle"]'));
  this.departmentTabset = element(by.css('.uni-department-links'));

  var deptTabs = (browser.params.region === gloabalConst.TW_REGION) ? element(by.xpath(
    '//uni-group//div[@class=\'uni-department-links\']')) : element(by.xpath(
    '//ui-view//div[@class="uni-department-links"][@tracking-category="department-links"]'));
  var homePage = element.all(by.xpath('//section//div[@class=\'uni-department-links\']')).first();
  var departmentsList = (browser.params.region === gloabalConst.TW_REGION) ? element.all(by.xpath(
    '//uni-group//div[@class=\'uni-department-links\']//button')) : element.all(by.xpath(
    '//ui-view//div[@class="uni-department-links"][@tracking-category="department-links"]//button'));
  var departmentsListKr = element.all(by.xpath(
    '//div[@class="uni-department-links"][@tracking-category="department-links"]//button'
  ));
  var floatingCart = element(by.xpath('//uni-go-to-cart-directive'));
  var gotoTopButton = element(by.className('uni-go-to-top__img'));
  var carousel = element(by.className('uni-carousel'));
  var halfLinks = element(by.className(halfLinkClass));
  var menHalfLink = element(by.xpath(
    '//div[@class="uni-half-link "][contains(@url,"/store/list/limited-offer")]'));
  var twLimitedOfferText = menHalfLink.element(by.xpath('//div[@class="uni-half-link__content"]'));
  var euAutomatedPages = element.all(by.xpath('//div[@class="uni-half-link__content"]'));
  var limitedOfferLink = (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
      browser.params.region === gloabalConst.FR_REGION) ? element(by.xpath(
      '//div[@class="uni-half-link__content"]//span[contains(., "' + regionalConstants.LIMITED_OFFER_LINK + '")]')) :
    element(by.xpath('//div[@class="uni-half-link__content"]//span[.="' + regionalConstants.LIMITED_OFFER_LINK +
      '"]'));

  limitedOfferLink = _.indexOf(gloabalConst.EU_REGIONS, browser.params.region) !== -1 &&
    process.env.TEST_ENVIRONMENT === gloabalConst.PRODUCTION ?
    element(by.xpath('//div[@class=\'owl-stage-outer\']//div[@alt=\'' + gloabalConst.LIMITED_OFFER_ALT_TEXT + '\']')) :
    limitedOfferLink;
  var specialOfferFirstItem = element(by.xpath('//ion-list//ion-item[1]'));

  var salesLink = (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
    browser.params.region === gloabalConst.FR_REGION) ? element(by.xpath(
    '//div[@class="uni-half-link__content"]//span[contains(., "' + regionalConstants.SALES_LINK + '")]')) : element(
    by.xpath('.//div[@class="uni-half-link__content"]//span[.="' + regionalConstants.SALES_LINK +
      '"]'));
  var newArrivalsLink = (browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
      browser.params.region === gloabalConst.FR_REGION) ? element(by.xpath(
      '//div[@class="uni-half-link__content"]//span[contains(., "' + regionalConstants.NEW_ARRIVALS_LINK + '")]')) :
    element(by.xpath('//div[@class="uni-half-link__content"]//span[.="' + regionalConstants.NEW_ARRIVALS_LINK +
      '"]'));

  newArrivalsLink = _.indexOf(gloabalConst.EU_REGIONS, browser.params.region) !== -1 &&
    process.env.TEST_ENVIRONMENT === gloabalConst.PRODUCTION ?
    element(by.xpath('//div[@class=\'owl-stage-outer\']//div[@alt=\'' + gloabalConst.NEW_ARRIVALS_ALT_TEXT + '\']')) :
    newArrivalsLink;
      
  var krLimitedOffer = element(by.xpath('//div[contains(@url,"limit")]'));
  var krLimitedOfferText = element(by.xpath('//div[contains(@url,"limit")]//div[@class="uni-half-link__content"]'));

  var recentlyViewed = element(by.className('uni-recently-viewed__size-placeholder'));
  var floatingCartCountElement = element(by.xpath(
    '//uni-go-to-cart-directive//span[@ng-show="goToCartController.getNumItemsInCart() > 0"]'));
  var recentlyViewedProducts = element.all(by.repeater('product in slide'));
  var bannerPopup = element(by.className('uni-bnanner-popup-modal'));
  var twStagingBannerPopup = element.all(by.xpath(
    '//ion-modal-view//div[@class="uni-bnanner-popup-modal__container"]'));
  var twStagingBannerPopupClose = element.all(by.xpath(
    '//ion-modal-view//div[@class="uni-bnanner-popup-modal__container"]//div[@class="uni-bnanner-popup-modal__bottom"]'
  ));
  var twStagingBannerImage = element.all(by.xpath(
    '//ion-modal-view//div[@class="uni-bnanner-popup-modal__container"]//img'));
  var bannerImage = element(by.className('uni-bnanner-popup-modal__image'));
  var bannerPopupClose = element(by.className('uni-bnanner-popup-modal__footer-close-button'));
  var euCarousel = element(by.className('uni-carousel__html-box'));
  var recentlyViewedCount;
  this.url = '/' + browser.params.region;
  var limitedOfferText;
  var L1HalfLinkKr = element(by.xpath('//div[@class="uni-half-links__container"]//div[@class="uni-half-link "]'));
  var halfLink_EU = element.all(by.xpath('//div[@class=\'uni-half-link \']'));
  var timeLineText = element(by.xpath('//div[@class="uni-timeline-summary__header"]//h4//font//font'));
  var timeLineBlockBtn = element(by.className(
    'uni-timeline-summary__timeline_link uni-icon-link__chevron uni-icon-right-chevron uni-timeline-summary__color-red'
  ));
  var floatingRecentlyViewedIcon = element(by.className('uni-go-to-recently-viewed__img'));
  var cookieNotification = element(by.tagName('uni-cookie-notification'));
  var cookieNotificationClose = element(by.className('uni-cookie-notification__btn--close'))
  var floatingCartCount;
  if (browser.params.region === gloabalConst.TW_REGION) {
    var recentlyViewed = element(by.xpath('//div[@ng-show="recentlyViewedController.slides.length > 0"]'));
    var recentlyViewedProducts = element.all(by.xpath(
      '//div[@ng-show="recentlyViewedController.slides.length > 0"]//div[@class="uni-product-list"]//div[@class="uni-product-list--filmstrip-view uni-filmstrip owl-loaded owl-drag"]//div[@class="owl-stage"]//div//div[@ng-repeat="product in productListCtrl.productData track by $index"]'
    ));
  }
  if (browser.params.region === gloabalConst.KR_REGION) {
    var deptTabs = element(by.xpath('//div[@class="uni-department-links"]'));
  }
  var ele = ((browser.params.region === gloabalConst.KR_REGION) || (browser.params.region === gloabalConst.TW_REGION)) ? $$(
    'div.uni-department-links[tracking-category="department-links"]').first() : $$(
    'ui-view div.uni-department-links[tracking-category="department-links"]').first();
  this.pageLoaded = this.and(
    this.isVisible(ele)
  );

  this.closeBanner = function () {
    if (browser.params.region === gloabalConst.TW_REGION) {
      twStagingBannerPopup.count().then(function (count) {
        if (count >= 1) {
          browser.driver.sleep(gloabalConst.SLEEP_5SEC);
          twStagingBannerPopup.get(count - 1).isPresent().then(function (status) {
            if (status) {
              twStagingBannerImage.get(count - 1).click();
              browser.driver.sleep(gloabalConst.SLEEP_5SEC);
              twStagingBannerPopupClose.get(count - 1).click();
              browser.driver.sleep(gloabalConst.SLEEP_3SEC);
            }
          });
        }
      });
    } else {
      bannerPopup.isPresent().then(function (status) {
        if (status) {
          bannerImage.click();
          browser.driver.sleep(gloabalConst.SLEEP_5SEC);
          bannerPopupClose.click();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        }
      });
    }
  };

  this.closeCookieNotification = function () {
    cookieNotificationClose.isPresent().then(status => {
      if (status) {
        cookieNotificationClose.click();
        browser.driver.sleep(gloabalConst.SLEEP_5SEC);
      }
    });
  }

  this.closeNotification = function () {
    cookieNotification.isPresent().then(function (status) {
      if (status) {
        cookieNotificationClose.click();
        browser.driver.sleep(gloabalConst.SLEEP_5SEC);
      }
    });
  }

  this.setLimiteOfferText = function (text) {
    limitedOfferText = text;
  };

  this.getLimiteOfferText = function () {
    return limitedOfferText;
  };

  this.clickOnWomenTab = function () {
    deptTabs.getLocation().then(function (position) {
      browser.executeScript('window.scrollTo(' + (position.x - 100) + ',' + (position.y - 100) + ');');
    });
    this.genderTabs[regionalConstants.WOMEN_SLUG].click();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

  this.clickOnMenTab = function () {
    var genderTab = this.genderTabs;
    return deptTabs.getLocation().then(function (position) {
      browser.executeScript('window.scrollTo(' + (position.x - 100) + ',' + (position.y - 300) + ');');
    }).then(function () {
      return genderTab[regionalConstants.MEN_SLUG].click();
    }).then(function () {
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    })
  };

  this.clickOnKidsTab = function () {
    deptTabs.getLocation().then(function (position) {
      browser.executeScript('window.scrollTo(' + (position.x - 100) + ',' + (position.y - 100) + ');');
    });
    this.genderTabs[regionalConstants.KIDS_SLUG].click();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

  this.clickOnBabyTab = function () {
    deptTabs.getLocation().then(function (position) {
      browser.executeScript('window.scrollTo(' + (position.x - 100) + ',' + (position.y - 100) + ');');
    });
    this.genderTabs[regionalConstants.BABY_SLUG].click();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

  this.getCategoriesCount = function (departmentName) {
    var dept = department.getDepartmentByName(departmentName, browser.params.region);
    var count = 0;
    dept.children.forEach(function (item) {
      if (!item.hidden) {
        count++;
      }
    });
    return count;
  };
  this.getCategoriesCountBySlug = function (slugName) {
    var dept = department.getDepartmentBySlug(slugName, browser.params.region);
    var count = 0;
    dept.children.forEach(function (item) {
      if (!item.hidden && browser.params.region === gloabalConst.KR_REGION) {
        count++;
      } else if (!item.hidden && item.children.length != 0) {
        count++;
      }
    });
    return count;
  };

  this.isFloatingCartPresent = function () {
    browser.executeScript('window.scrollTo(0,200);').then(function () {
      browser.executeScript('return window.pageYOffset;').then(function () {
        expect(floatingCart.isDisplayed()).toBe(true, 'Floating cart button not displayed');
      });
    });
  };

  this.isHalfLinksPresent = function () {
    expect(halfLinks.isPresent()).toBe(true, 'HalfLinks not present');
  };

  this.clickOnNthHalfLink = function (index) {
    halfLink_EU.get(index).click();
    browser.driver.sleep(gloabalConst.SLEEP_3SEC);
  };

  this.isImageCarouselPresent = function () {
    if ((browser.params.region === gloabalConst.EU_REGION || browser.params.region === gloabalConst.DE_REGION ||
        browser.params.region === gloabalConst.FR_REGION)) {
      expect(euCarousel.isPresent()).toBe(true, 'ImageCarousel not present');
    } else {
      expect(carousel.isPresent()).toBe(true, 'ImageCarousel not present');
    }
  };

  this.isGotoTopButtonPresent = function () {
    expect(gotoTopButton.isPresent()).toBe(true, 'GotoTopButton not present');
  };

  this.isRecentlyViewedSectionPresent = function () {
    return recentlyViewed.isPresent().then(function (status) {
      return status;
    });
  }

  this.checkRecentlyViewedimages = function () {
    expect(recentlyViewed.isPresent()).toBe(true, 'Recently Viewed Image is not displayed');
  };

  this.clickFirstRecentlyViewedProduct = function () {
    recentlyViewedProducts.click();
  };

  this.clickNthRecentlyViewedProduct = function (index) {
    recentlyViewedProducts.get(index).getLocation().then(function (position) {
      browser.executeScript('window.scrollTo(' + (position.x - 100) + ',' + (position.y - 100) + ');').then(
        function () {
          recentlyViewedProducts.get(index).click();
          browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        });
    });
  };

  this.setRecentlyViewdListCount = function () {
    recentlyViewedProducts.count().then(function (count) {
      recentlyViewedCount = count;
    });
  };
  
  this.setRegion = function () {
    regionalConstants = require('../constants/' + browser.params.region + '-constants');
    this.genderTabs = buildGenderTabs();
  }
  
  this.getRecentlyViewdListCount = function () {
    return recentlyViewedCount;
  };

  this.isTopButton = function () {
    browser.executeScript('window.scrollTo(0,200);').then(function () {
      browser.executeScript('return window.pageYOffset;').then(function (pos) {
        expect(pos).toBe(200, 'Scrolling down to 200 is not happen');
      });
      expect(gotoTopButton.isDisplayed()).toBe(true, 'Top button is not displayed on scrolling');
      gotoTopButton.click();
      browser.driver.sleep(gloabalConst.SLEEP_2SEC);
    });
    browser.executeScript('return window.pageYOffset;').then(function (pos) {
      expect(pos).toBe(0, 'Scrolling to top is not happen');
    });
    expect(gotoTopButton.isDisplayed()).toBe(false, 'Top button is not disappeared after clicking it');
  };

  this.checkIfDepartmentTabsDisplayed = function () {
    this.inDom(this.departmentTabset);
    departmentsList.get(0).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.WOMEN_CATEGORY, 'Women tab is not displayed properly');
    });
    departmentsList.get(1).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.MEN_CATEGORY, 'Men tab is not displayed properly');
    });
    departmentsList.get(2).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.KIDS_CATEGORY, 'Kids tab is not displayed properly');
    });
    departmentsList.get(3).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.BABY_CATEGORY, 'Baby tab is not displayed properly');
    });
  };

  this.checkIfDepartmentTabsDisplayedUs = function () {
    this.inDom(this.departmentTabset);
    departmentsList.get(0).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.WOMEN_CATEGORY, 'Women tab is not displayed properly');
    });
    departmentsList.get(1).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.MEN_CATEGORY, 'Men tab is not displayed properly');
    });
    departmentsList.get(2).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.GIRLS_CATEGORY, 'Kids tab is not displayed properly');
    });
    departmentsList.get(3).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.BOYS_CATEGORY, 'Boys tab is not displayed properly');
    });
    departmentsList.get(4).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.BABY_CATEGORY, 'Baby tab is not displayed properly');
    });
  };

  this.checkIfDepartmentTabsDisplayedKr = function () {
    this.inDom(this.departmentTabset);
    departmentsListKr.get(0).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.WOMEN_CATEGORY, 'Women tab is not displayed properly');
    });
    departmentsListKr.get(1).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.MEN_CATEGORY, 'Men tab is not displayed properly');
    });
    departmentsListKr.get(2).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.KIDS_CATEGORY, 'Kids tab is not displayed properly');
    });
    departmentsListKr.get(3).getText().then(function (tabName) {
      expect(tabName).toEqual(regionalConstants.BABY_CATEGORY, 'Baby tab is not displayed properly');
    });
  };
  this.lastCategory = function (count) {
    var position;
    var finalCategory = element(by.repeater('category in departmentPageController.departmentInfo.children').row(
      count - 1));
    finalCategory.getLocation().then(function (current) {
      position = current;
      return browser.executeScript('window.scrollTo(' + (position.x) + ',' + (position.y) + ');');
    }).then(function () {
      return finalCategory.click().then(function () {
        return browser.driver.sleep(gloabalConst.SLEEP_5SEC).then(function () {
          return browser.navigate().back().then(function () {
            return browser.driver.sleep(gloabalConst.SLEEP_5SEC).then(function () {
              if (finalCategory.isPresent) {
                return finalCategory.getLocation().then(function (current) {
                  expect(current).toEqual(position, 'user not anchored to the same place from where he left');
                });
              } else {
                expect(finalCategory.isPresent()).toBe(true, 'user not anchored to the same place from where he left');
              }
            })
          })
        })
      })
    })
  }
  this.findCategories = function () {
    var deferred = protractor.promise.defer();
    var categories = element.all(by.repeater('category in departmentPageController.departmentInfo.children'));
    categories.getText().then(function (categoryArray) {
      var filteredCategories = categoryArray.filter(function (category) {
        return category !== '';
      });
      deferred.fulfill(filteredCategories);
    });
    return deferred.promise;
  };

  this.findFirstCategory = function () {
    return element(by.repeater('category in departmentPageController.departmentInfo.children').row(0));
  };

  this.clickOnFirstCategory = function () {
    this.findFirstCategory().click();
  };

  this.verifyBackButton = function () {
    browser.navigate().back();
    browser.driver.sleep(gloabalConst.SLEEP_5SEC);
    this.closeBanner();
    browser.driver.sleep(gloabalConst.SLEEP_5SEC);
    this.verfiyComponents();
  };

  this.verfiyComponents = function () {
    expect(this.at()).toBeTruthy();
    if (browser.params.region === gloabalConst.KR_REGION) {
      this.checkIfDepartmentTabsDisplayedKr();
    } else {
      this.checkIfDepartmentTabsDisplayed();
    }
  };

  var buildGenderTabs = function () {
    var genderTabs = {};
    var tabItems = [regionalConstants.WOMEN_SLUG, regionalConstants.MEN_SLUG, regionalConstants.KIDS_SLUG,
      regionalConstants.BABY_SLUG
    ];
    for (var index = 0; index < tabItems.length; index++) {
      genderTabs[tabItems[index]] = ((browser.params.region === gloabalConst.KR_REGION) || (browser.params.region === gloabalConst.TW_REGION)) ? $(
        'div.uni-department-links[tracking-category="department-links"] button.qa-uni-department-links__link--' +
        tabItems[index]) : $(
        'ui-view div.uni-department-links[tracking-category="department-links"] button.qa-uni-department-links__link--' +
        tabItems[index]);
    }
    return genderTabs;
  };

  this.genderTabs = buildGenderTabs();

  this.clickOnMenHalfLink = function (region) {
    if (region === gloabalConst.TW_REGION) {
      return twLimitedOfferText.getText().then((string) => {
        this.setLimiteOfferText(string);
        menHalfLink.click();
        return true;
      }).catch(function (e) {
        return false;
      });
    } else if (region === gloabalConst.KR_REGION) {
      krLimitedOffer.click();
      return true;
    }
  };

  this.isSalesHalfLinkPresent = function () {
    return salesLink.isPresent();
  };

  this.isNewArrivalsHalfLinkPresent = function () {
    return newArrivalsLink.isPresent();
  };

  this.isLimitedOfferHalfLinkPresent = function () {
    return limitedOfferLink.isPresent();
  };

  this.clickSaleHalfLink = function () {
    salesLink.isPresent().then(function (isPresent) {
      if (isPresent) {
        salesLink.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        if(_.includes(gloabalConst.PRODUCTION_URLS, runConfig[process.env[gloabalConst.TEST_ENVIRONMENT]].baseURL)) {
          womenThroughHalfLinks.click();  
        }
      }
    });
  };

  this.clickNewArrivalsHalfLink = function () {
    newArrivalsLink.isPresent().then(function (isPresent) {
      if (isPresent) {
        newArrivalsLink.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        if(_.includes(gloabalConst.PRODUCTION_URLS, runConfig[process.env[gloabalConst.TEST_ENVIRONMENT]].baseURL)) {
          womenThroughHalfLinks.click();  
        }
      }
    });
  };

  this.clickLimitedOfferHalfLink = function () {
    limitedOfferLink.isPresent().then(function (isPresent) {
      if (isPresent) {
        limitedOfferLink.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        if(_.includes(gloabalConst.PRODUCTION_URLS, runConfig[process.env[gloabalConst.TEST_ENVIRONMENT]].baseURL)) {
          womenThroughHalfLinks.click();  
        }
      }
    })
  };

  this.clickOnSpecialPopUpFirstItem = function () {
    specialOfferFirstItem.isPresent().then(function (isPresent) {
      if (isPresent) {
        specialOfferFirstItem.click();
        browser.driver.sleep(gloabalConst.SLEEP_3SEC);
        if(_.includes(gloabalConst.PRODUCTION_URLS, runConfig[process.env[gloabalConst.TEST_ENVIRONMENT]].baseURL)) {
          womenThroughHalfLinks.click();  
        }
      }
    })
  };

  this.clickOnLimitedOfferKR = function () {
    krLimitedOfferText.getText().then((string) => {
      this.setLimiteOfferText(string);
      krLimitedOffer.click();
    })
  };

  this.floatingButtonCartQuantity = function (cartCount) {
    browser.executeScript('window.scrollTo(0,100);').then(function () {
      browser.driver.sleep(gloabalConst.SLEEP_3SEC);
    });
    floatingCartCountElement.getText().then(function (count) {
      expect(parseInt(count)).toEqual(parseInt(floatingCartCount) + cartCount);
    });
  };

  this.setFloatingCartCount = function () {
    floatingCartCountElement.isPresent().then(function (status) {
      if (status) {
        floatingCartCountElement.getText().then(function (count) {
          floatingCartCount = parseInt(count);
        });
      } else {
        floatingCartCount = 0;
      }
    });
  };

  this.getTimeLineText = function () {
    timeLineText.getText().then(function (text) {
      expect(text).toEqual('Timeline', 'TimeLine is not displayed properly');
    });
  };

  this.clickOnTimeLineBtn = function () {
    timeLineBlockBtn.click();
  };

  this.isFloatingRecentlyViewedPresent = function () {
    expect(floatingRecentlyViewedIcon.isPresent()).toBe(true, 'Recently Viewed button not displayed');
  };

};

L1Page.prototype = Page; // extend basePage...
module.exports = new L1Page();