module.exports = function(grunt) {
  'use strict';

  // Load the plugin that clean files and directories.
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Load the plugin to Replaces references from non-optimized scripts,
  // stylesheets and other assets to their optimized version within a
  // set of HTML files (or any templates/views).
  grunt.loadNpmTasks('grunt-usemin');
  // Load the plugin to Minify HTML
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // Load the plugin to Minify HTML - 2
  grunt.loadNpmTasks('grunt-html-minify');
  // Load the plugin to Minify images
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // Load the plugin to Compress CSS files.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Load the plugin to Concatenate files.
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Load the plugin that minify and concatenate ".js" files.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that create directories with Grunt.
  grunt.loadNpmTasks('grunt-mkdir');
  // Load the plugin that copy files and directories.
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Load the plugin to Static file asset revisioning through content hashing
  grunt.loadNpmTasks('grunt-rev');
  // Publish to GitHub Pages with Grunt
  grunt.loadNpmTasks('grunt-gh-pages');
  // Automatic notifications when tasks fail.
  grunt.loadNpmTasks('grunt-notify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    properties: grunt.file.readJSON('properties.json'),

    /* clean directories */
    clean: ['<%= properties.dist %>'],

    /* prepares the configuration to transform specific construction (blocks)
    in the scrutinized file into a single line, targeting an optimized version
    of the files (e.g concatenated, uglifyjs-ed ...) */
    useminPrepare: {
      html: '<%= properties.src %>/index.html',
        options: {
          dest: '<%= properties.dist %>'
        }
    },

    /* html minification */
    htmlmin: {
      dist: {
        // It´s not work, so I use grunt-html-minify
        //options: {
        //  removeComments: true,
        //  collapseWhitespace: true
        //},
        files: [{
          expand: true,
          cwd: '<%= properties.src %>',
          src: ['*.html'],
          dest: '<%= properties.dist %>'
        }]
      }
    },

    /* image minification */
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= properties.src %>/img',
          src: '{,*/}*.{ico,png,jpg,jpeg,gif,webp,svg}',
          dest: '<%= properties.dist %>/img'
        }]
      }
    },

    /* cssmin */
    /* is not necessary to declare */

    /* js file minification */
    uglify: {
      options: {
        preserveComments: false
      }
    },

    /* create dir fonts */
    mkdir: {
      all: {
        options: {
          create: ['<%= properties.dist %>/fonts']
        },
      },
    },

    /* put files not handled in other tasks here */
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= properties.src %>',
          dest: '<%= properties.dist %>',
          src: ['*.txt', '.htaccess']
        }]
      }
    },

    /* cache busting */
    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      files: {
        src: [
          '<%= properties.dist %>/js/{,*/}*.js',
          '<%= properties.dist %>/css/{,*/}*.css',
          '<%= properties.dist %>/img/{,*/}*.{ico,png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    /* replace links to minificated files */
    usemin: {
      html: ['<%= properties.dist %>/index.html'],
        options: {
          dirs: ['<%= properties.dist %>']
        }
    },

    /* html minification */
    html_minify: {
      options: { },
      all: {
        files:[{
          expand: true,
          cwd: '<%= properties.dist %>',
          src: ['*.html'],
          dest: '<%= properties.dist %>',
          ext:'.html'
        }]
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

  // tasks
  grunt.registerTask('build', [
    'clean',
    // 'useminPrepare',
    // 'htmlmin',
    // 'imagemin',
    // 'concat',
    // 'cssmin',
    // 'uglify',
    // 'mkdir',
    // 'copy',
    // 'rev',
    // 'usemin',
    // 'html_minify',
    'gh-pages'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
