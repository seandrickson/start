module.exports = (grunt) ->

  require('load-grunt-tasks') grunt

  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"

    manifest: dev:
      options: basePath: "assets/img"
      src: "*"

    jade: dev:
      options:
        data: grunt.file.readJSON "assets/icons.json"
        pretty: true
      files: "index.html": ["<%= watch.jade.files %>"]

    compass: dev:
      options:
        sassDir: "assets"
        cssDir: "assets"
        outputStyle: "compressed"
        force: true

    autoprefixer: no_dest: src: "<%= watch.css.files %>"

    coffee: dev:
      options: bare: true
      files: "assets/main.js": ["<%= watch.coffee.files %>"]

    coffeelint:
      grunt: files: src: ["<%= watch.grunt.files %>"]
      dev: files: src: ["<%= watch.coffee.files %>"]

    uglify: dev: files: "assets/main.js": ["assets/main.js"]

    watch:
      grunt:
        files: ["Gruntfile.coffee"]
        tasks: ["coffeelint:grunt"]

      jade:
        files: ["index.jade"]
        tasks: ["jade", "manifest"]

      coffee:
        files: ["assets/main.coffee"]
        tasks: ["coffeelint:dev", "coffee", "uglify", "jade", "manifest"]

      sass:
        files: ["assets/*.scss"]
        tasks: ["compass"]

      css:
        files: ["assets/*.css"]
        tasks: ["autoprefixer", "jade", "manifest"]

      livereload:
        files: ["index.html"]
        options: livereload: true

  grunt.registerTask "default", "watch"