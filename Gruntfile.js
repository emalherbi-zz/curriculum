var path = require('path');

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    properties: grunt.file.readJSON('properties.json'),

    /* bower install */
    bower: {
      install: {
        options: {
          targetDir: './app/lib',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: true,
          bowerOptions: {}
        }
      }
    },

    /* commit on gh-pages github */
    'gh-pages': {
      options: {
        base: 'app/',
        message: 'auto-generated commit'
      },
      src: ['**/*']
    }

  });

	// Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

  // tasks
  grunt.registerTask('bower', [
    'bower:install'
  ]);

  grunt.registerTask('default', [
    'gh-pages'
  ]);

};
