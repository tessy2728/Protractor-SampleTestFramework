var util = require('../utility/util');

var Department = function () {
  var categoryCatalogs = [{
    id: "tw",
    name:"Taiwan",
    departments:[]
    }, {
    id: "kr",
    name:"Korean",
    departments:[] 
    }, {
    id: "eu",
    name:"Europe",
    departments:[] 
    }, {
    id: "fr",
    name:"France",
    departments:[] 
    }, {
    id: "de",
    name:"Germany",
    departments:[] 
    }, {
    id: "jp",
    name:"Japan",
    departments:[] 
  }];
var categoryList = [];

  this.getDepartmentByName = function (deptName, REGION) {
    for(var i = 0;i < categoryCatalogs.length;i++) {
      if(categoryCatalogs[i].id == REGION) {
        for(var j = 0;i < categoryCatalogs[i].departments.length;j++) {
          if(categoryCatalogs[i].departments[j].name === deptName) {
            return categoryCatalogs[i].departments[j];
          }
        }
      }
    }
  };

  this.getDepartmentBySlug = function (slug, REGION) {
    for(var i = 0;i < categoryCatalogs.length;i++) {
      if(categoryCatalogs[i].id == REGION) {
        for(var j = 0;j < categoryCatalogs[i].departments.length;j++) {
          if(categoryCatalogs[i].departments[j].slug === slug) {
            return categoryCatalogs[i].departments[j];
          }
        }
      }
    }
  };

  this.setCategoryList = function(slug, REGION, categories, classId) {
    categoryList = [];
    for(var i = 0;i < categoryCatalogs.length;i++) {
      if (categoryCatalogs[i].id == REGION) {
        for(var j = 0;j < categoryCatalogs[i].departments.length;j++) {
          if (categoryCatalogs[i].departments[j].slug === slug) {
            for(var k = 0;k < categoryCatalogs[i].departments[j].children.length; k++) {
              if (categoryCatalogs[i].departments[j].children[k].id === classId){
                for(var p = 0;p < categoryCatalogs[i].departments[j].children[k].children.length; p++) {
                  if(util.checkItemExistsInArray(categories, categoryCatalogs[i].departments[j].children[k].children[p].id)) {
                      categoryList.push(categoryCatalogs[i].departments[j].children[k].children[p].id);
                  }
                }
              } 
            }
          }
        }
      }
    }
  };

  this.getCategoryList = function() {
    return categoryList;
  };

  this.getCategoryByName = function (categories, categoryName) {      
  };  

  this.getDeptsByCountry = function (categoryCatalogs, countryCode) {
    categoryCatalogs.filter(function (categoryCatalog) {
      if(categoryCatalog.id == countryCode) {
        return categoryCatalog;
      }
    });
  };

  this.setDepartments = function (departments, REGION) {
    categoryCatalogs.forEach(function (categoryCatalog) {
      if(categoryCatalog.id == REGION){
        categoryCatalog.departments = departments;
      }
    });
  };

  this.getCategoryCatalogs = function () {
    return categoryCatalogs;
  };

  this.getWomensDepartment = function () {
    return departments[browser.params.region].women;
  };

  this.getMensDepartment = function () {
    return departments[browser.params.region].men;
  };

  this.getAddToCartItem = function (department) {
    return departments[browser.params.region][department].cartItem;
  };

  this.getDepartment = function (departmentName) {
    return departments[browser.params.region][departmentName];
  };  

  this.getDepartmentIdBySlug = function (slug, REGION) {
    for(var i = 0;i < categoryCatalogs.length;i++) {
      if(categoryCatalogs[i].id == REGION) {
        for(var j = 0;i < categoryCatalogs[i].departments.length;j++) {
          if(categoryCatalogs[i].departments[j].slug === slug) {
            return categoryCatalogs[i].departments[j].id;
          }
        }
      }
    }
  };

};

module.exports = new Department();