var gulp = require("gulp");
var ngmin = require('gulp-ng-annotate');
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var karma = require("gulp-karma");

var config = require('./config/config.js');

gulp.task("test", ["minify"], function(){
    gulp.src(config.testFiles)
        .pipe(karma({
            configFile: 'config/karma.conf.js',
            action: 'run'
        }));
});

gulp.task("minify", function(){
    gulp.src("statehelper.js")
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(rename("statehelper.min.js"))
        .pipe(gulp.dest("./"));
});