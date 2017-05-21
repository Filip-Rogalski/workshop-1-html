var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('hello', function(){
    console.log('hello world')
});

gulp.task('sass', function(){
    return gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded',
            sourcemapsComments: 'map'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', ['serve']);