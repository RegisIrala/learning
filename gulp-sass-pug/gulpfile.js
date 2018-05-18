var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var notify = require("gulp-notify");
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create();

/* Task compile pug to html */
gulp.task('pug', function() {
    return gulp.src('./src/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
});

/* Task compile sass to css */
gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.sass')
        .pipe(sass())
        .on('error', notify.onError({ title: 'Error SASS', message: '<%= error.message %>' }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

/* Task minify js */
gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .on('error', notify.onError({ title: 'Error JavaSript', message: '<%= error.message %>' }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

/* Task server local */
gulp.task('watcher', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    /* Watch */
    gulp.watch('./src/pug/*.pug', ['pug']);
    gulp.watch('./src/sass/**/*.sass', ['sass']);
    gulp.watch("./src/components/bootstrap/scss/**/*.scss", ['sass']);
    gulp.watch("./src/js/**/*.js", ['js']);
});

gulp.task('default', ['pug', 'sass', 'js', 'watcher']);