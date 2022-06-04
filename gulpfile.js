'use strict';


const  gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
// const imageMin = require('gulp-imagemin');

// Пути к папкам
const paths = {
    styles: {
        src: 'src/sass/**/*',
        dest: 'dist/css/'
    },

    scripts: {
        src: 'src/assets/js/**/*',
        dest: 'dist/js/'
    }
};

// Функции пакетов

function styles() {
    return gulp.src(paths.styles.src)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe (rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

function scripts() {
    return gulp.src(paths.scripts.src, {
        sourcemaps: true
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}

function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
}

function clean() {
    return del(['dist']);
}

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch);


exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;