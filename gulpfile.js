const gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

var paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'assets/css'
    }
};

const style = () => {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
};

const styleProd = () => {
    return gulp
        .src(paths.styles.src)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest(paths.styles.dest));
};

const reload = () => {
    browserSync.reload();
};


const watch = () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch('index.html', reload);
};

exports.watch = watch
exports.style = style;
exports.styleProd = styleProd;

gulp.task('build', styleProd);
gulp.task('default', gulp.parallel(style, watch));