var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    fileinclude = require("gulp-file-include"),
    minify = require('gulp-minify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css');

var input = "app/src/scss/*.scss";
var output = "app/dist/css/";

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

gulp.task('compress_js', function() {
  gulp.src('app/src/js/*.js')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))

    .pipe(gulp.dest('app/dist/js/'))
});

gulp.task('compress_controllers_js', function() {
  gulp.src('app/src/js/controllers/*.js')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))

    .pipe(gulp.dest('app/dist/js/controllers'))
});

gulp.task('compress_services_js', function() {
  gulp.src('app/src/js/services/*.js')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minify({
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))

    .pipe(gulp.dest('app/dist/js/services'))
});
// gulp.task('fileinclude', function() {
//   gulp.src('app/source/*.html')
//     .pipe(fileinclude({
//       prefix: '@@',
//       basepath: '@file'
//     }))
//     .pipe(gulp.dest('./app/views/'));
// });

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', Corriendo tareas... Amando a los animales <3');
    });
});

gulp.task('scripts', function() {
  return gulp.src(['app/dist/**/*.js', '!app/dist/**/*.min-debug.js'])
    .pipe(concat('alljavascript.js'))
    .pipe(gulp.dest('app/'));
});

gulp.task('styles', function() {
  return gulp.src(['app/bower_components/angular-bootstrap/ui-bootstrap-csp.css', 'app/bower_components/components-font-awesome/css/font-awesome.css', 'app/bower_components/flexslider/flexslider.css', 'app/dist/css/stylesheet.css', 'app/bower_components/sweetalert2/dist/sweetalert2.css'])
    .pipe(concatCss('allstyles.css'))
    .pipe(gulp.dest('app/'));
});

gulp.task('default', ['sass', 'watch', 'compress_js', 'compress_controllers_js', 'compress_services_js', 'scripts', 'styles']);
