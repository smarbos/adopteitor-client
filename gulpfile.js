var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

var output = "app/css/";
var input = "app/scss/*.scss";

var sassOptions = {
  errLogToConsole: false,
  outputStyle: 'expanded'
};

gulp.task('css', function() {
    return sass(config.sassPath + output, {
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
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./stylesheets/maps'))
    .pipe(gulp.dest(output));
});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'watch']);
