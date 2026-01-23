import gulp from 'gulp';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import * as dartSass from 'sass';
import concat from 'gulp-concat';
import fileinclude from 'gulp-file-include';
import nunjucksRender from 'gulp-nunjucks-render';
import uglifyModule from 'gulp-uglify-es';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';

const bs = browserSync.create();
const sassCompiler = sass(dartSass);
const uglify = uglifyModule.default || uglifyModule;

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
  return gulp
    .src(['assets/scss/style.scss'])
    .pipe(sassCompiler())
    .pipe(gulp.dest('build/assets/css'))
    .pipe(bs.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', () => {
  return gulp
    .src([
      'assets/js/typed.js',
      'assets/js/glider.min.js',
      'assets/js/script.js',
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('build/assets/js'))
    .pipe(bs.stream());
});

// File include
gulp.task('fileinclude', () => {
  return gulp
    .src(['html-dev/*.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: 'html-dev/',
      }),
    )
    .pipe(
      nunjucksRender({
        path: ['build'],
      }),
    )
    .pipe(gulp.dest('build'))
    .pipe(bs.stream());
});

// File include for events
gulp.task('eventsfileinclude', () => {
  return gulp
    .src(['html-dev/events/*.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: 'html-dev/events/',
      }),
    )
    .pipe(
      nunjucksRender({
        path: ['build'],
      }),
    )
    .pipe(gulp.dest('build/events'))
    .pipe(bs.stream());
});

// Fonts
gulp.task('fonts', () => {
  return gulp.src('assets/fonts/*').pipe(gulp.dest('build/assets/fonts'));
});

// Iconfont
gulp.task('Iconfont', async () => {
  // Dynamically import gulp-iconfont to avoid top-level await issues
  const iconfontModule = await import('gulp-iconfont');
  
  // Extract the function - CommonJS modules use .default when imported via dynamic import()
  // Try .default first, then fallback to the module itself
  const iconfontFn = (typeof iconfontModule.default === 'function') 
    ? iconfontModule.default 
    : (typeof iconfontModule === 'function' ? iconfontModule : iconfontModule.default || iconfontModule);
  
  if (typeof iconfontFn !== 'function') {
    throw new Error(
      `gulp-iconfont is not a function. ` +
      `Got: ${typeof iconfontFn}, ` +
      `default: ${typeof iconfontModule.default}, ` +
      `module: ${typeof iconfontModule}`
    );
  }
  
  // Create options object - use plain object literal to ensure compatibility
  const iconfontOptions = {
    fontName: 'iconFont',
    prependUnicode: true,
    formats: ['ttf', 'eot', 'woff', 'svg'],
    normalize: true,
    fontWeight: '300',
    fontHeight: 100,
    fixedWidth: false,
    centerHorizontally: false,
  };
  
  // Double-check fontName exists and is a string
  if (!iconfontOptions.fontName || typeof iconfontOptions.fontName !== 'string') {
    throw new Error(`fontName is required but got: ${iconfontOptions.fontName} (${typeof iconfontOptions.fontName})`);
  }
  
  // Call the function directly with options
  return gulp
    .src(['assets/img/icons/*.svg'])
    .pipe(iconfontFn(iconfontOptions))
    .pipe(gulp.dest('build/assets/fonts/'));
});

gulp.task('images', () => {
  return gulp.src('assets/img/**/*').pipe(gulp.dest('build/assets/img/'));
});

gulp.task('copyFavicon', () => {
  return gulp.src('public/favicon.ico').pipe(gulp.dest('build'));
});

// Static Server + watching scss/html files
gulp.task(
  'serve',
  gulp.series(
    [
      'sass',
      'js',
      'fileinclude',
      'eventsfileinclude',
      'fonts',
      'Iconfont',
      'images',
      'copyFavicon'
    ],
    () => {
      bs.init({
        server: './build',
      });

      gulp.watch(['assets/scss/*.scss'], gulp.series('sass'));
      gulp.watch(['assets/js/*.js'], gulp.series('js'));
      gulp.watch(['html-dev/**/*.html'], gulp.series('fileinclude'));
      gulp.watch(['html-dev/events/*.html'], gulp.series('eventsfileinclude'));
      gulp.watch(['assets/fonts/*.*'], gulp.series('fonts'));
      gulp.watch(['assets/img/icons/*.svg'], gulp.series('Iconfont'));
      gulp.watch(['assets/img/**/*'], gulp.series('images'));
    },
  ),
);

gulp.task('default', gulp.parallel('serve'));

// build for prod

gulp.task('sassbuild', () => {
  return gulp
    .src(['assets/scss/style.scss'])
    .pipe(sassCompiler())
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest('build/assets/css'));
});

gulp.task('jsbuild', () => {
  return gulp
    .src([
      'assets/js/typed.js',
      'assets/js/glider.min.js',
      'assets/js/script.js',
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'));
});

gulp.task('fileincludebuild', () => {
  return gulp
    .src(['html-dev/*.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: 'html-dev/',
      }),
    )
    .pipe(
      nunjucksRender({
        path: ['build'],
      }),
    )
    .pipe(gulp.dest('build'));
});

gulp.task('eventsfileincludebuild', () => {
  return gulp
    .src(['html-dev/events/*.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: 'html-dev/events/',
      }),
    )
    .pipe(
      nunjucksRender({
        path: ['build'],
      }),
    )
    .pipe(gulp.dest('build/events'));
});

gulp.task(
  'servebuild',
  gulp.series([
    'sassbuild',
    'jsbuild',
    'fileincludebuild',
    'eventsfileincludebuild',
    'fonts',
    'Iconfont',
    'images',
    'copyFavicon',
  ]),
);

gulp.task('build', gulp.parallel('servebuild'));
