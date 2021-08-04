var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var del = require('del');

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'assets'
        },
    })
})

gulp.task('watch', function () {
    // Other watchers
})

gulp.task('minifyJs', function () {
    return gulp.src('assets/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public'))
});

gulp.task('minifyCss', () => {
    return gulp.src('assets/**/*.css')
        .pipe(gulp.dest('public'));
});

gulp.task('fonts', () => {
    return gulp.src('assets/vendor/fontawesome-free/**/*')
        .pipe(gulp.dest('public/vendor/fontawesome-free'));
});

gulp.task('images', function () {
    return gulp.src('assets/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest('public'))
});

gulp.task('default', gulp.series(['browserSync'], 'watch', function (done) {
    done();
}))

gulp.task('clean', function (done) {
    del.sync('public/css');
    del.sync('public/images');
    del.sync('public/js');
    del.sync('public/vendor');
    done();
})

gulp.task('build', gulp.series(
    'minifyJs',
    'minifyCss',
    'fonts',
    'images', function (done) {
        done();
    }))