const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    fileinclude = require('gulp-file-include'),
    iconfont = require('gulp-iconfont'),
    nunjucksRender = require('gulp-nunjucks-render');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src(['assets/scss/style.scss'])
        .pipe(sass())
        .pipe(gulp.dest("build/assets/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', () => {
    return gulp.src(
        [
            'assets/js/typed.js',
            'assets/js/glider.min.js',
            'assets/js/script.js',
        ]
    )
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest("build/assets/js"))
        .pipe(browserSync.stream());
});

// File include
gulp.task('fileinclude', () => {
    return gulp.src(['html-dev/*.html'])
        .pipe(
            fileinclude({
                prefix: '@@',
                basepath: 'html-dev/',
            }),
        )
        .pipe(nunjucksRender({
            path: ['build']
        }))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
});

// Fonts
gulp.task('fonts', () => {
    return gulp.src('assets/fonts/*').pipe(gulp.dest('build/assets/fonts'));
});

// Iconfont
gulp.task('Iconfont', () => {
    return gulp
        .src(['assets/img/icons/*.svg'])
        .pipe(
            iconfont({
                fontName: 'iconFont',
                prependUnicode: true,
                formats: ['ttf', 'eot', 'woff', 'svg'],
                normalize: true,
                fontWeight: '300',
                fontHeight: 100,
                fixedWidth: false,
                centerHorizontally: false,
            }),
        )
        .pipe(gulp.dest('build/assets/fonts/'));
});

gulp.task('images', () => {
    return gulp.src('assets/img/**/*').pipe(gulp.dest('build/assets/img/'));
});

// gulp.task('default', () => {
//     return gulp.src('html-dev/*.html')
//         .pipe(nunjucksRender({
//             path: ['src/templates/'] // String or Array
//         }))
//         .pipe(gulp.dest('build'));
// });

// Static Server + watching scss/html files
gulp.task('serve', gulp.series(['sass', 'js', 'fileinclude', 'fonts', 'Iconfont', 'Iconfont', 'images'], () => {

    browserSync.init({
        server: "./build"
    });

    gulp.watch(['assets/scss/*.scss'], gulp.series('sass'));
    gulp.watch(['assets/js/*.js'], gulp.series('js'));
    gulp.watch(['html-dev/**/*.html'], gulp.series('fileinclude'));
    gulp.watch(['assets/fonts/*.*'], gulp.series('fonts'));
    gulp.watch(['assets/img/icons/*.svg'], gulp.series('Iconfont'));
    gulp.watch(['assets/img/**/*'], gulp.series('images'));
}));

gulp.task('default', gulp.parallel('serve'));