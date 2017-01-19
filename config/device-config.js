var locationConfig = require('./location-config');
var deviceConfigs = {
  browser: {
    seleniumAddress: "http://127.0.0.1:4444/wd/hub",
    iphone5: {
      'browserName': 'chrome',
      'maxInstances': 4,
      'chromeOptions': {
        'mobileEmulation': {
      	 	'deviceName': 'Apple iPhone 5',
      	},
        'prefs': locationConfig.locationOffPrefs
      }
    },
    iphone4: {
      'browserName': 'chrome',
      'chromeOptions': {
        'mobileEmulation': {
      	 	'deviceName': 'Apple iPhone 4'
      	},
        'prefs': locationConfig.locationOnPrefs
      }
    },
    iphone6: {
      'browserName': 'chrome',
      'chromeOptions': {
        'mobileEmulation': {
      	 	'deviceName': 'Apple iPhone 6 Plus'
      	},
        'prefs': locationConfig.locationOnPrefs
      }
    },
    nexus5: {
      'browserName': 'chrome',
      'chromeOptions': {
        'mobileEmulation': {
      	 	'deviceName': 'Google Nexus 5'
      	},
        'prefs': locationConfig.locationOnPrefs
      }
    },
    iphone5_loc_off: {
      'browserName': 'chrome',
      'chromeOptions': {
        'mobileEmulation': {
          'deviceName': 'Apple iPhone 5',
        },
        'prefs': locationConfig.locationOffPrefs
      }
    },
  },
  device: {
    seleniumAddress: "http://127.0.0.1:4723/wd/hub",
    NexusOne: {
        browserName: 'chrome',
        platformName: 'Android',
        platformVersion: '5.0.1',
        deviceName: 'NexusOne',
    },
    iphone5: {
      browserName: process.env['TEST_BROWSER_NAME'] || 'safari',
      platformName: 'iOS',
      platformVersion: process.env['TEST_PLATFORM_VERSION'] || '9.0',
      deviceName: 'iPhone 5'
    },
    nexus5: {
      browserName: process.env['TEST_BROWSER_NAME'] || 'browser',
      platformName: 'Android',
      platformVersion: process.env['TEST_PLATFORM_VERSION'] || '5.1',
      deviceName: 'nexus5',
    },
    samsung:{
       browserName: 'chrome',
      'appium-version': '1.0',
      platformName: 'Android',
      manufacturer: 'Samsung',
      model: 'Galaxy.*',
      openDeviceTimeout: 5
    }
  },
  browserPrivate: {
    seleniumAddress: "http://127.0.0.1:4444/wd/hub",
    iphone5: {
      'browserName': 'chrome',
      'chromeOptions': {
        'mobileEmulation': {
          'deviceName': 'Apple iPhone 5',
        },
        'args': ['incognito'],
        'prefs': locationConfig.locationOnPrefs
      }
    },
    iphone4: {
      'browserName': 'chrome',
      'chromeOptions': {
        'mobileEmulation': {
          'deviceName': 'Apple iPhone 4'
        },
        'args': ['incognito'],
        'prefs': locationConfig.locationOnPrefs
      }
    },
    iphone6: {
      'browserName': 'chrome',
      'chromeOptions': {
        'mobileEmulation': {
          'deviceName': 'Apple iPhone 6 Plus'
        },
        'args': ['incognito'],
        'prefs': locationConfig.locationOnPrefs
      }
    },
    nexus5: {
      'browserName': 'chrome',
      'chromeOptions': {
        'mobileEmulation': {
          'deviceName': 'Google Nexus 5'
        },
        'args': ['incognito'],
        'prefs': locationConfig.locationOnPrefs
      }
    }
  }
};

module.exports = deviceConfigs[process.env['TEST_ENDPOINT']] || deviceConfigs['browser'];