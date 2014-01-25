module.exports = (grunt) ->
  "use strict"

  require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks

  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"

    jade:
      dev:
        options:
          data: grunt.file.readJSON "assets/icons.json"
          pretty: true

        files:
          "index.html": ["<%= watch.jade.files %>"]

    compass:
      dev:
        options:
          sassDir: "assets"
          cssDir: "assets"
          outputStyle: "compressed"
          force: true

    autoprefixer:
      no_dest:
        src: "<%= watch.css.files %>"

    coffee:
      compile:
        options:
          bare: true
        files:
          "assets/main.js": ["<%= watch.coffee.files %>"]

    coffeelint:
      grunt:
        files:
          src: ["<%= watch.grunt.files %>"]
      dev:
        files:
          src: ["<%= watch.coffee.files %>"]

    uglify:
      dev:
        files:
          "assets/main.js": ["<%= watch.js.files %>"]

    watch:
      grunt:
        files: ["Gruntfile.coffee"]
        tasks: ["coffeelint:grunt"]

      jade:
        files: ["index.jade"]
        tasks: ["jade"]

      coffee:
        files: ["assets/*.coffee"]
        tasks: ["coffeelint:dev", "coffee"]

      js:
        files: ["assets/*.js"]
        tasks: ["uglify", "jade"]

      sass:
        files: ["<%= compass.dev.options.sassDir %>/*.scss"]
        tasks: ["compass"]

      css:
        files: ["<%= compass.dev.options.cssDir %>/*.css"]
        tasks: ["autoprefixer", "jade"]

      livereload:
        files: [
          "<%= watch.jade.files %>",
          "<%= watch.css.files %>",
          "<%= watch.js.files %>"
        ]
        options:
          livereload: true

  grunt.registerTask "default", "watch"