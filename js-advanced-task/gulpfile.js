const gulp  = require('gulp');

const babel = require('gulp-babel');

gulp.task('babel', () =>
   gulp.src('src/js/*.js')
       .pipe(babel({
           presets: ['env']
       }))
       .pipe(gulp.dest('dist/js'))
);

gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['babel']);
});