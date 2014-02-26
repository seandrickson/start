module.exports = (grunt) ->

  require('load-grunt-tasks') grunt

  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"

    paths:
      src: "assets/src"
      dest: "assets/dest"
      grunt: "Gruntfile.coffee"
      jade:
        src: "index.jade"
        dest: "index.html"
      scss:
        src: "<%= paths.src %>/main.scss"
        dest: "<%= paths.dest %>/main.css"
      coffee:
        src: "<%= paths.src %>/main.coffee"
        dest: "<%= paths.dest %>/main.js"

    manifest: dev:
      src: "assets/img/*"

    jade: dev:
      options:
        data: grunt.file.readJSON "assets/src/icons.json"
        pretty: true
      files: "<%= paths.jade.dest %>": "<%= paths.jade.src %>"

    sass: dev:
      options: outputStyle: "compressed"
      files: "<%= paths.scss.dest %>": "<%= paths.scss.src %>"

    autoprefixer: dev:
      files: "<%= paths.scss.dest %>": "<%= paths.scss.dest %>"

    csso: dev:
      files: "<%= paths.scss.dest %>": "<%= paths.scss.dest %>"

    coffee: dev:
      options: bare: true
      files: "<%= paths.coffee.dest %>": "<%= paths.coffee.src %>"

    coffeelint:
      grunt: files: src: ["<%= paths.grunt %>"]
      dev: files: src: ["<%= paths.coffee.src %>"]

    uglify: dev:
      files: "<%= paths.coffee.dest %>": "<%= paths.coffee.dest %>"

    watch:
      grunt:
        files: ["<%= paths.grunt %>"]
        tasks: ["coffeelint:grunt"]

      jade:
        files: ["<%= paths.jade.src %>"]
        tasks: ["jade", "manifest"]

      coffee:
        files: ["<%= paths.coffee.src %>"]
        tasks: ["coffeelint:dev", "coffee", "uglify", "jade", "manifest"]

      sass:
        files: ["<%= paths.scss.src %>"]
        tasks: ["sass", "autoprefixer", "csso", "jade", "manifest"]

      livereload:
        files: ["<%= paths.jade.dest %>"]
        options: livereload: true

  grunt.registerTask "default", "watch"