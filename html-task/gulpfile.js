const gulp  = require('gulp');
const sass  = require('gulp-sass');
//const babel = require('gulp-babel');
const gulpCopy = require('gulp-copy');

const paths = {
  src: {
    scss: {
      folder: './src/scss/**/*.scss',
      main:   './src/scss/main.scss'
    },

    js:   './src/js/*.js',
    html: './src/*.html',
    img:  './src/images/**/*'
  },

  dist: {
    folder: './dist/',
    scss:   './dist/css/',
    js:     './dist/js/',
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
    .pipe(gulp.dest(patsh.dist.scss));
});

gulp.task('watch', function() {
  gulp.watch(paths.src.scss.folder, ['sass']);
  gulp.watch([paths.src.html, paths.src.img, paths.src.js], ['copy']);
});

// gulp.task('babel', () =>
//   gulp.src('src/app.js')
//     .pipe(babel({
//         presets: ['env']
//     }))
//     .pipe(gulp.dest('dist/js'))
// );

gulp.task('default', ['sass', 'watch'/*, 'babel'*/]);

gulp.task('copy', function() {
  gulp.src(paths.src.html)
      .pipe(gulp.dest(paths.dist.folder));
  gulp.src(paths.src.img)
      .pipe(gulp.dest(paths.dist.img));
  gulp.src(paths.src.js)
      .pipe(gulp.dest(paths.dist.js));
});