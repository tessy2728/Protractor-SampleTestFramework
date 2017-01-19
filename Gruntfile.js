module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            protractor_test_kr: ['protractor-krTrial', 'protractor-krSmoke'],
        },
        protractor: {
            options: {
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            krSmoke: {
                options: {
                    configFile: "config/kr-config.js",
                    args: {
                        suite: ["smoke"],
                        params: {region: "kr"}
                    }
                }
            },
            krTrial: {
                options: {
                    configFile: "config/kr-config.js",
                    args: {
                        suite: ["trial"],
                        params: {region: "kr"}
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('protractor-krSmoke', ['protractor:krSmoke']);
    grunt.registerTask('protractor-krTrial', ['protractor:krTrial']);
};
