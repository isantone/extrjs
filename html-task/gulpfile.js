const gulp  = require('gulp');
const sass  = require('gulp-sass');
//const babel = require('gulp-babel');
const gulpCopy = require('gulp-copy');

gulp.task('sass', function() {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass(/*{
      outputStyle: 'compressed'
    }*/).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
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
  const sourceFiles = [ './src/*.html', './src/images/*', './src/js/*.js' ];
  const destination = './dist/';

  gulp.src('./src/*.html')
      .pipe(gulp.dest('./dist/'));
  gulp.src('./src/images/**/*')
      .pipe(gulp.dest('./dist/images/'));
  gulp.src('./src/js/*.js')
      .pipe(gulp.dest('./dist/js/'));
});