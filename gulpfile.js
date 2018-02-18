var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    del = require('del'),
    concat = require('gulp-concat'),
    min = require('gulp-uglify'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    browser = require("browser-sync").create();

    var paths = {
    js : './js/**/*.js',
    jsdir : './js',
        script: './scripts/build.js',
    scss : [
        './scss/**/*.scss',
        '!scss/**/*_scsslint_tmp*.scss'
    ],
    cssdir : './css',
    html: './**/*.html'
};

gulp.task('clean', function (){ 
	del.sync([paths.jsdir, paths.cssdir])
})

gulp.task('sass:dev', function () {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceComments: 'normal'
        }).on('error', sass.logError))
        .pipe(size({ showFiles: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.cssdir))
        .pipe(browser.stream());
});

gulp.task('sass:prod', function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(paths.cssdir));
});

gulp.task('js:dev', function () {
    return browserify(paths.script)
        .transform('babelify', {
            presets: ['es2015', 'react'],
            plugins: ['transform-class-properties']
        })
        .bundle()
        .on('error', function (err) {
            gutil.log(gutil.colors.red.bold('[browserify error]'));
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source('build.js'))
        .pipe(gulp.dest(paths.jsdir));
});

gulp.task('watch', function () {
    browser.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(paths.scss, ['sass:dev']);
    gulp.watch(paths.script, ['js:dev']);
    gulp.watch([paths.html, paths.js]).on('change', browser.reload);
});

gulp.task('default', ['clean', 'js:dev', 'sass:dev', 'watch']);
gulp.task('prod', ['clean', 'sass:prod']);