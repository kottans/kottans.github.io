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
  let iconfontFn = iconfontModule.default;
  if (typeof iconfontFn !== 'function') {
    iconfontFn = iconfontModule;
  }
  if (typeof iconfontFn !== 'function') {
    throw new Error(
      `gulp-iconfont is not a function. ` +
      `Got: ${typeof iconfontFn}, ` +
      `default: ${typeof iconfontModule.default}, ` +
      `module: ${typeof iconfontModule}, ` +
      `keys: ${Object.keys(iconfontModule).join(', ')}`
    );
  }
  
  // Create options object - ensure fontName is explicitly set and not lost
  // gulp-iconfont passes options directly to svgicons2svgfont, so fontName must be present
  const iconfontOptions = {};
  iconfontOptions.fontName = 'iconFont';  // MUST be set first - required by svgicons2svgfont
  iconfontOptions.prependUnicode = true;
  iconfontOptions.formats = ['ttf', 'eot', 'woff', 'svg'];
  iconfontOptions.normalize = true;
  iconfontOptions.fontWeight = '300';
  iconfontOptions.fontHeight = 100;
  iconfontOptions.fixedWidth = false;
  iconfontOptions.centerHorizontally = false;
  
  // Validate fontName before calling
  if (!iconfontOptions.fontName || typeof iconfontOptions.fontName !== 'string' || iconfontOptions.fontName.length === 0) {
    throw new Error(`fontName must be a non-empty string, got: ${JSON.stringify(iconfontOptions.fontName)}`);
  }
  
  // Debug logging for CI
  if (process.env.CI) {
    console.log('[DEBUG] Iconfont options keys:', Object.keys(iconfontOptions));
    console.log('[DEBUG] fontName value:', iconfontOptions.fontName);
    console.log('[DEBUG] fontName type:', typeof iconfontOptions.fontName);
    console.log('[DEBUG] Options object:', JSON.stringify(iconfontOptions));
    console.log('[DEBUG] Function type:', typeof iconfontFn);
    console.log('[DEBUG] Function name:', iconfontFn.name || 'anonymous');
  }
  
  // Call the function - ensure options object is passed correctly
  // The issue might be that gulp-iconfont does: options = options || {}
  // So we need to ensure options is truthy and has all required properties
  const stream = iconfontFn(iconfontOptions);
  
  if (!stream) {
    throw new Error('gulp-iconfont did not return a stream');
  }
  
  return gulp
    .src(['assets/img/icons/*.svg'])
    .pipe(stream)
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
