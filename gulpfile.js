const gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

var paths = {
    styles: {
        src: 'src/scss/*.scss',
        dest: 'assets/css'
    }
};

const style = () => {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
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
const build = gulp.parallel(style, watch);

gulp.task('build', build);
gulp.task('default', build);