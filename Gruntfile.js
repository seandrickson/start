'use strict';

module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    autoprefixer: {
      single_file: {
        src: 'css/main.css',
        dest: 'css/main.css'
      }
    },

    compass: {
      dev: {
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },

    csso: {
      dist: {
        files: {
          'css/main.css': ['css/main.css']
        }
      }
    },

    jshint: {
      files: ['js/*.js'],
      options: {
        ignores: ['js/jquery*.js']
      }
    },

    uglify: {
      min: {
        files: {
          'js/main.min.js': ['js/main.js']
        }
      }
    },

    watch: {
      sass: {
        files: ['css/*.scss'],
        tasks: ['compass','autoprefixer','csso']
      },
      /* watch and see if our javascript files change, or new packages are installed */
      js: {
        files: ['js/main.js'],
        tasks: ['jshint','uglify']
      },
      /* watch our files for change, reload */
      livereload: {
        files: ['*.html', 'css/*.css', 'js/*.js'],
        options: {
          livereload: true
        }
      },
    }

  });

  grunt.registerTask('default', 'watch');

}