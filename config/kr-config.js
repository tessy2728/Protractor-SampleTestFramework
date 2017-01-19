var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var deviceConfig = require('./device-config');
var jasmineConfig = require('./jasmine-config');
var runConfig = require('./run-env-config');
var testDevice = process.env['TEST_DEVICE'] || 'sample-device';
var reportFolder = 'test-reports/kr/' + testDevice + '/';
var SpecReporter = require('jasmine-spec-reporter');
var gloabalConst = require('../constants/constants');
var summaryReporter = require('../reporter/Jasmine2HTMLSummaryReporter');

exports.config = {
    framework: 'jasmine',
    seleniumAddress: deviceConfig['seleniumAddress'],
    seleniumArgs: [],
    suites: {
      smoke: ['../specs/search-page-spec.js'],
      trial: ['../specs/search-page-spec.js']
    },
    capabilities: deviceConfig[process.env['TEST_DEVICE']] || deviceConfig['iphone5'],
    baseUrl: runConfig[process.env[gloabalConst.TEST_ENVIRONMENT]].baseURL || runConfig[globalConst.PRODUCTION].baseURL,
    // Assign the test reporter to each running instance
    onPrepare: function() {
      jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
              savePath: reportFolder,
              screenshotsFolder: 'screen-shots',
              takeScreenshots: true,
              takeScreenshotsOnlyOnFailures: true,
              filePrefix: 'KR-TestReport'
            })
        );
      jasmine.getEnv().addReporter(
            new summaryReporter({
              savePath: 'test-summary',
              filePrefix: 'KR-TestSummaryReport'
            })
        );
    },
    jasmineNodeOpts: jasmineConfig,
    params: {region: "kr"}
};