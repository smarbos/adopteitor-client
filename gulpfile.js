var gulp = require('gulp'),
    sass = require('gulp-ruby-sass');

var config = {
    sassPath: './app/scss',
    bowerDir: './bower_components'
};
gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('css', function() {
    return sass(config.sassPath + '/*.scss', {
            style: 'compressed',
            loadPath: [
                './app/scss',
                config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                config.bowerDir + '/fontawesome/scss',
            ]
        })
        .pipe(gulp.dest('./app/css'));
});

gulp.task('sass', function() {
  return gulp.src('/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('/app/css'));
});

gulp.task('default', ['watch']);
