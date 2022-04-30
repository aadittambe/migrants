module.exports = function (grunt) {

    const sass = require('node-sass')
    // Configuration
    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),
        uglify: {
            t1: {
                files: [
                    {
                        src: 'src/a.js',
                        dest: 'build/a.min.js',
                    }
                ]
            },
            t2: {
                // options:{
                //     banner: 'const b = "in t2 only"'
                // },
                files: [
                    {
                        src: 'src/js/*js',
                        dest: 'build/js/script.min.js'
                    }
                ]
            }
        },
        imagemin: {
            static: {
                options: {
                    optipng: false,
                    pngquant: true,
                    zopflipng: true,
                    jpegRecompress: false,
                    mozjpeg: true,
                    gifsicle: true,
                    svgo: true
                },
                files: [{
                    'build/images/map.png': 'src/images/map.png',
                    'build/images/refugee-l.png': 'src/images/refugee-l.png'
                }]
            }
        },
        sass: {
            build: {
                files: [{
                    src: 'src/css/sass/styles.scss',
                    dest: 'src/css/styles.css'
                }]
            },
            options: {
                implementation: sass,
                sourceMap: true,
            }
        },
        cssmin: {
            target: {
                files: [
                    {
                        src: 'src/css/*.css',
                        dest: 'build/style.min.css'
                    }
                ]
            }
        },
        htmlmin: {
            options: {
                collapseWhiteSpace: true,
            },
            target: {
                files: [
                    {
                        src: 'src/index.html',
                        dest: 'build/index.html'
                    }
                ]
            },
        },
        watch: {
            files: ['src/images/*.png', 'src/*.html', 'src/css/sass/*scss', 'src/css/*css', 'src/js/*js'],
            tasks: ['imagemin', 'sass', 'htmlmin', 'cssmin', 'uglify'],
            options: {
                livereload: true,
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: {
                        path: 'build/',
                        options: {
                            index: 'index.html'
                        }
                    }
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('compressJS', 'uglify');
    grunt.registerTask('compressABC', 'uglify:t2');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['connect', 'watch']);

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('myTask', 'my basic task', function () {
        grunt.log.writeIn(arg);
    })


    // load plugins
    // grunt.loadNpmTasks('grunt-contrib-concat');


    // register tasks

};

// https://www.youtube.com/watch?v=3Xem8LgoIMw&