/* DT207G - Backend-baserad webbutveckling
 * Moment 2
 * Linn Eriksson, VT24
 */

//Variables to include in NPM-packages
const {src, dest, watch, series, parallel} = require("gulp");
const browserSync = require('browser-sync').create();
const htmlminify = require('gulp-html-minifier-terser');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;

//Paths
const files = {
    htmlPath: "src/**/*.html",
    sassPath: "src/css/**/*.scss",
    jsPath: "src/js/**/*.js"
}

//HTML-task
function htmlTask() {
    return src(files.htmlPath)
    .pipe(htmlminify({collapseWhitespace:true, removeComments:true, removeEmptyElements:false})) // maxLineLength:120 used during testing.
    .pipe(dest('pub'))
}

//SASS-task
function sassTask() {
    return src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))// {outputStyle: 'compressed'} ska läggas till i sass() när testning är klar
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest("pub/css"))
    .pipe(browserSync.stream());
}


//JS-task
function jsTask() {
    return src(files.jsPath)
    .pipe(uglify())
    .pipe(dest('pub/js'));
}

//Watcher
function watchTask() {

    browserSync.init({
        server: "./pub"
    });

    watch([files.htmlPath, files.sassPath, files.jsPath], parallel(htmlTask, sassTask, jsTask)).on('change', browserSync.reload);
}

//Run all tasks above
exports.default = series(
    parallel(htmlTask, sassTask, jsTask),
    watchTask
);