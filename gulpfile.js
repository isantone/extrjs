const gulp  = require('gulp');
const sass  = require('gulp-sass');
//const babel = require('gulp-babel');
const gulpCopy = require('gulp-copy');
//const webserver = require('gulp-webserver');
//const browserSync = require('browser-sync').create();

//const imagemin = require('gulp-imagemin');

//const browserify = require('browserify');
//const watchify = require('watchify');
//const source = require('vinyl-source-stream');

//const sourceJsFile = './js/main.js';
//const destFolder = paths.dist.js;
//const destFile = 'findem.js';

const paths = {
  src: {
    scss: {
      folder: './src/scss/**/*.scss',
      main:   './src/scss/main.scss'
    },

    js:   './src/js/main.js',
    html: './src/**/*.html',
    img:  './src/images/**'
  },

  dist: {
    folder: './dist/',
    scss:   './dist/css/',
    js: {
      folder: './dist/js/',
      bundle: 'bundle.js'
    },
    img:    './dist/images/'
  }
};

//const sourceFiles = [ './src/*.html', './src/images/*', './src/js/*.js' ];
//const destination = './dist/';

gulp.task('sass', function() {
  return gulp.src(paths.src.scss.main)
    .pipe(sass(/*{
      outputStyle: 'compressed'
    }*/).on('error', sass.logError))
    .pipe(gulp.dest(paths.dist.scss));
});

gulp.task('watch', function() {
  gulp.watch(paths.src.scss.folder, ['sass']);

  //gulp.watch(paths.src.html, ['copyHtml']);
  //gulp.watch(paths.src.img, ['copyImg']);
  //gulp.watch(paths.src.js, ['copyJs']);
});

// gulp.task('babel', () =>
//   gulp.src('src/app.js')
//     .pipe(babel({
//         presets: ['env']
//     }))
//     .pipe(gulp.dest('dist/js'))
// );

gulp.task('default', ['sass', 'watch'/*, 'babel'*/]);

gulp.task('copyHtml', function() {
  gulp.src(paths.src.html)
      .pipe(gulp.dest(paths.dist.folder));
});

gulp.task('copyImg', function() {
  gulp.src(paths.src.img)
      .pipe(imagemin())
      .pipe(gulp.dest(paths.dist.img));
});

gulp.task('copyJs', function() {
  gulp.src(paths.src.js)
      .pipe(gulp.dest(paths.dist.js.folder));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: "dist/index.html"
    }));
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});

gulp.task('browserify', function() {
  return browserify(paths.src.js)
  .bundle()
  .pipe(source(paths.dist.js.bundle))
  .pipe(gulp.dest(paths.dist.js.folder));
});
