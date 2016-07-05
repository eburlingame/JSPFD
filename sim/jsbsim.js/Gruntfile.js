'use strict';
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Time how long tasks take. Can help when optimizing build times
    //require('time-grunt')(grunt);
    // Configurable paths for the application
    var appConfig = {
        app: './',
        dist: 'dist',
        testDist: 'test/dist'
    };
    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        yeoman: appConfig,
        coffee: {
            compile: {
                files: {
                    'test/tests.js': 'test/**/*.coffee'
                }
            }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '<%= yeoman.testDist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },
        run: {
            distclean: {
                cmd: 'make',
                args: ['-C', './JSBSim', 'distclean']
            },
            build: {
                cmd: './build.sh'
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'run:distclean',
        'run:build',
        'coffee:compile'
    ]);
    grunt.registerTask('default', [
        'build'
    ]);
};
