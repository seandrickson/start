module.exports = function(grunt) {
  "use strict";

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
          sassDir: 'css',
          cssDir: 'css',
          imagesDir: 'img',
          javascriptsDir: 'js',
          fontsDir: 'fonts',
          outputStyle: 'nested',
          relativeAssets: true,
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

    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: {
          'index.html': ['<%= watch.jade.files %>']
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js','<%= watch.js.files %>'],
      options: {
        ignores: ['js/*.min.js']
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
      jade: {
        files: ['*.jade'],
        tasks: ['jade']
      },
      sass: {
        files: ['css/*.scss'],
        tasks: ['compass','autoprefixer','csso','jade']
      },
      js: {
        files: ['js/*.js'],
        tasks: ['jshint','uglify','jade']
      },
      livereload: {
        files: ['*.jade','*.html','css/*.css','js/*.js'],
        options: { livereload: true }
      },
    }

  });

  grunt.registerTask('default', 'watch');
};
