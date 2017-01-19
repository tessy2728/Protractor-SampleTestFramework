var fs     = require('fs'),
    mkdirp = require('mkdirp'),
    _      = require('lodash'),
    path   = require('path'),
    hat    = require('hat');

//require('string.prototype.startswith');

var UNDEFINED, exportObject = exports;

function getQualifiedFilename(path, filename, separator) {
    if (path && path.substr(-1) !== separator && filename.substr(0) !== separator) {
        path += separator;
    }
    return path + filename;
}
function log(str) {
    var con = global.console || console;
    if (con && con.log) {
        con.log(str);
    }
};

function Jasmine2HTMLSummaryReporter(options) {

    var self = this;

    self.started = false;
    self.finished = false;
    // sanitize arguments
    options = options || {};
    self.takeScreenshots = options.takeScreenshots === UNDEFINED ? true : options.takeScreenshots;
    self.savePath = options.savePath || '';
    self.takeScreenshotsOnlyOnFailures = options.takeScreenshotsOnlyOnFailures === UNDEFINED ? false : options.takeScreenshotsOnlyOnFailures;
    self.screenshotsFolder = (options.screenshotsFolder || 'screenshots').replace(/^\//, '') + '/';
    self.useDotNotation = options.useDotNotation === UNDEFINED ? true : options.useDotNotation;
    self.fixedScreenshotName = options.fixedScreenshotName === UNDEFINED ? false : options.fixedScreenshotName;
    self.consolidate = options.consolidate === UNDEFINED ? true : options.consolidate;
    self.consolidateAll = self.consolidate !== false && (options.consolidateAll === UNDEFINED ? true : options.consolidateAll);
    self.filePrefix = options.filePrefix || (self.consolidateAll ? 'htmlReport' : 'htmlReport-');
    var specFailedCount = 0;
    var totalSpecCount = 0;
    var suiteCount = 0;
    var specCount = 0;

    var suites = [],
        currentSuite = null,
        totalSpecsExecuted = 0,
        totalSpecsDefined,
        // when use use fit, jasmine never calls suiteStarted / suiteDone, so make a fake one to use
        fakeFocusedSuite = {
            id: 'focused',
            description: 'focused specs',
            fullName: 'focused specs'
        }; 
    var totalSeconds = 0;
    function setTime()
    {
        ++totalSeconds;
    }

    self.jasmineStarted = function(summary) {
        totalSpecCount = summary.totalSpecsDefined;
        setInterval(setTime, 1000);

    };
    self.suiteStarted = function(suite) {
        console.log('Suite started: ' + suite.description);
        suiteCount++;
    };
    self.specStarted = function(spec) {

    };
    self.specDone = function(spec) {

        totalSpecsExecuted++;
        if(spec.failedExpectations.length > 0)
        {
             console.log('Failed ' + spec.failedExpectations.length + ' expectations in '+ spec.fullName);
             specFailedCount++;
        }
    };
    self.suiteDone = function(suite) {
        if(suite.failedExpectations.length >0)
         console.log('Failed suites:' + suite.failedExpectations.length + ' suites');
    };
    self.jasmineDone = function() {
        if (currentSuite) {
            // focused spec (fit) -- suiteDone was never called
            self.suiteDone(fakeFocusedSuite);
        }
        var output = '';
        output += self.getSummaryOutput(suiteCount,totalSpecCount, specFailedCount, totalSeconds);
        // if we have anything to write here, write out the consolidated file
        if (output) {
            wrapOutputAndWriteFile(self.filePrefix, output);
        }
    };
    self.getSummaryOutput = function(suiteCount, totalSpecCount, specFailedCount, timeTaken) {
      var output = summaryAsHtml(suiteCount,totalSpecCount,specFailedCount, totalSeconds);
      console.log('-------'+ suiteCount +' Regression Suites Finished -------');
      console.log('Executed ' + totalSpecCount + ' specs');
      console.log('Failures :' + specFailedCount + ' specs');
      console.log('Passed :' + (totalSpecCount - specFailedCount) + ' specs');
      console.log('Suites completed execution in '+ totalSeconds +'secs');
      console.log('---------------------------------------------------');
      if (self.consolidateAll || self.consolidate && suite._parent) {
          return output;
      } else {
          // if we aren't supposed to consolidate output, just write it now
          wrapOutputAndWriteFile(generateFilename(suite), output);
          return '';
      }
    }



    function summaryAsHtml(suiteCount, totalSpecCount, specFailedCount, specCount, timeTaken) {
        var html = '<article class="suite">';
        html += '<header>';
        html += '<h3>-------'+ suiteCount +' Regression Suites Finished -------</h3> </header>';
        html += '<ul>';
        html += '<li>Executed: <strong> ' + totalSpecCount + '</strong> specs</li>';
        html += '<li>Passed: <strong>' + (totalSpecCount - specFailedCount) + '</strong> specs</li>';
        html += '<li>Failures: <strong>' + specFailedCount+ '</strong> specs</li>';
        html += '</ul>';
        html += '<p>Suites completed execution in '+ totalSeconds +' secs</p>';
        html += '\n </article>';
        return html;
    }

    /******** Helper functions with closure access for simplicity ********/
    function generateFilename(suite) {
        return self.filePrefix + getFullyQualifiedSuiteName(suite, true) + '.html';
    }

    self.writeFile = function(filename, text) {
        var errors = [];
        var path = self.savePath;

        function phantomWrite(path, filename, text) {
            // turn filename into a qualified path
            filename = getQualifiedFilename(path, filename, window.fs_path_separator);
            // write via a method injected by phantomjs-testrunner.js
            __phantom_writeFile(filename, text);
        }

        function nodeWrite(path, filename, text) {
            var fs = require("fs");
            var nodejs_path = require("path");
            require("mkdirp").sync(path); // make sure the path exists
            var filepath = nodejs_path.join(path, filename);
            var htmlfile = fs.openSync(filepath, "w");
            fs.writeSync(htmlfile, text, 0);
            fs.closeSync(htmlfile);
            return;
        }
        // Attempt writing with each possible environment.
        // Track errors in case no write succeeds
        try {
            phantomWrite(path, filename, text);
            return;
        } catch (e) { errors.push('  PhantomJs attempt: ' + e.message); }
        try {
            nodeWrite(path, filename, text);
            return;
        } catch (f) { errors.push('  NodeJS attempt: ' + f.message); }

        // If made it here, no write succeeded.  Let user know.
        log("Warning: writing html report failed for '" + path + "', '" +
            filename + "'. Reasons:\n" +
            errors.join("\n")
        );
    };

    // To remove complexity and be more DRY about the silly preamble and <testsuites> element
    var prefix = '<!DOCTYPE html><html><head lang=en><meta charset=UTF-8><title></title><style>body{font-family:"open_sans",sans-serif}.suite{width:100%;overflow:auto}.suite .stats{margin:0;width:90%;padding:0}.suite .stats li{display:inline;list-style-type:none;padding-right:20px}.suite h2{margin:0}.suite header{margin:0;padding:5px 0 5px 5px;background:#003d57;color:white}.spec{width:100%;overflow:auto;border-bottom:1px solid #e5e5e5}.spec:hover{background:#e8f3fb}.spec h3{margin:5px 0}.spec .description{margin:1% 2%;width:65%;float:left}.spec .resume{width:29%;margin:1%;float:left;text-align:center}</style></head>';
        prefix += '<body><section>';
    var suffix = '\n</section></body></html>';
    function wrapOutputAndWriteFile(filename, text) {
        if (filename.substr(-5) !== '.html') { filename += '.html'; }
        self.writeFile(filename, (prefix + text + suffix));
    }

    return this;
}

module.exports = Jasmine2HTMLSummaryReporter;
