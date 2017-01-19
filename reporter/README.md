# protractor-jasmine2-summary-html-reporter

HTML reporter for Jasmine2 and Protractor with a Summary of Test Result
## Usage
The <code>protractor-jasmine2-summary-html-reporter</code> is available via npm:

<code>$ npm install protractor-jasmine2-summary-html-reporter --save-dev</code>

In your Protractor configuration file, register protractor-jasmine2-summary-html-reporter in jasmine:

<pre><code>var Jasmine2HTMLSummaryReporter = require('protractor-jasmine2-summary-html-reporter');

exports.config = {
   // ...
   onPrepare: function() {
      jasmine.getEnv().addReporter(
        new Jasmine2HTMLSummaryReporter({
          savePath: reportFolder,
          screenshotsFolder: 'screen-shots',
          takeScreenshots: true,
          takeScreenshotsOnlyOnFailures: true,
          filePrefix: 'Report'
        })
      );
   }
}</code></pre>

## Options
### Destination folder

Output directory for created files. All screenshots and reports will be stored here.

If the directory doesn't exist, it will be created automatically or otherwise cleaned before running the test suite.

<pre><code>jasmine.getEnv().addReporter(new Jasmine2HTMLSummaryReporter({
   savePath: './test/reports/'
}));</code></pre>

Default folder: <code>./</code>

### Screenshots folder (optional)

By default the screenshots are stored in a folder inside the default path

If the directory doesn't exist, it will be created automatically or otherwise cleaned before running the test suite.

<pre><code>jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
   savePath: './test/reports/',
   screenshotsFolder: 'images'
}));</code></pre>

Default folder: <code>screenshots</code>

### Take screenshots (optional)

When this option is enabled, reporter will create screenshots for specs.

<pre><code>jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
   takeScreenshots: false
}));</code></pre>

Default is <code>true</code>

### Take screenshots only on failure (optional) - (NEW)

This option allows you to choose if create screenshots always or only when failures.
If you disable screenshots, obviously this option will not be taken into account.

<pre><code>jasmine.getEnv().addReporter(new Jasmine2HTMLSummaryReporter({
   takeScreenshots: true,
   takeScreenshotsOnlyOnFailures: true
}));</code></pre>

Default is <code>false</code> (So screenshots are always generated)


### FixedScreenshotName (optional)

Choose between random names and fixed ones.

<pre><code>jasmine.getEnv().addReporter(new Jasmine2HTMLSummaryReporter({
   savePath: './test/reports/',
   fixedScreenshotName: true
}));</code></pre>

Default is <code>false</code>


### FilePrefix (optional)

Filename for html report.

<pre><code>jasmine.getEnv().addReporter(new Jasmine2HTMLSummaryReporter({
   savePath: './test/reports/',
   filePrefix: 'index'
}));</code></pre>

Default is <code>htmlReport.html</code>

### Consolidate and ConsolidateAll (optional)

This option allow you to create diferent HTML for each test suite.

<pre><code>jasmine.getEnv().addReporter(new Jasmine2HTMLSummaryReporter({
   consolidate: true,
   consolidateAll: true
}));</code></pre>

Default is <code>false</code>