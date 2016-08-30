var path = require('path');
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    properties: grunt.file.readJSON('properties.json'),
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
  grunt.registerTask('default', [
    'gh-pages'
  ]);
};
