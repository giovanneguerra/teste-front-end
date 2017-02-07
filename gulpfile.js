var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var csslint = require('gulp-csslint');
var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var cleanCss = require('gulp-clean-css');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var notify = require('gulp-notify');
gulp.task('sass',function(){
    gulp.src(['css/src/**/*.sass'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('css/dist'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/dist'))
        .pipe(reload({stream:true}))
        .pipe(notify('css task finished'));
});
gulp.task('js',function(){
    gulp.src(['js/src/**/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(concat('function.js'))
          .pipe(browserify())
        .pipe(gulp.dest('js/dist'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('js/dist'))
        .pipe(reload())
          .pipe(notify('js task finished'));
});
gulp.task('html',function(){
    gulp.src(['html/**/*.html'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('./'))
        .pipe(reload())
        .pipe(notify('html task finished'));
});
gulp.task('image',function(){
    gulp.src(['images/src/**/*'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(cache(imageMin()))
        .pipe(gulp.dest('images/dist'))
        .pipe(reload())
        .pipe(notify('image task finished'));
});
gulp.task('iconfont', function(){
    gulp.src(['fonts/src/**/*.svg'])
        .pipe(iconfont({
            fontName: 'iconG'
        }))
        .on('codepoints', function(codepoints) {
            var options = {
                glyphs: codepoints,
                fontName: 'iconG',
                fontFamily: 'iconG',
                className: 'icon',
                timestamp: Date.now()
            };
            gulp.src('fonts/src/template/**/*.css')
                .pipe(consolidate('lodash', options))
                .pipe(rename({
                    basename:'iconG'
                }))
                .pipe(gulp.dest('fonts/dist/template'));
            gulp.src('fonts/src/template/**/*.html')
                .pipe(consolidate('lodash', options))
                .pipe(rename({
                    basename:'iconG'
                }))
                .pipe(gulp.dest('fonts/dist/template'));
        })
        .pipe(gulp.dest('fonts/dist'))
        .pipe(reload());
});
gulp.task('default',function(){
    browserSync.init({
        server: "./"
    });
    gulp.watch('js/src/**/*.js',['js']);
    gulp.watch('css/src/**/*.sass',['sass']);
    gulp.watch('html/**/*.html',['html']);
    gulp.watch('images/src/**/*',['image']);
    gulp.watch('fonts/src/**/*.svg',['iconfont']);
});
