var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var livereload = require('gulp-livereload');

/* JS plugins */
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
/* End of js plugins */

// less plugins
var less = require('gulp-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({browsers: ["last 2 versions"]});
var LessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new LessPluginCleanCSS({advanced: true});
/* end of less plugins*/


var jsFiles = ['./*.js','./config/*.js'],
    lessFiles = ['./src/less/*.less'];


var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

gulp.task('watch', function() {

  gulp.watch(lessFiles, ['less']);
  gulp.watch(jsFiles, ['js']);
  gulp.watch('./app/views/*.jade', ['views']);

});


gulp.task('views', function() {
 return gulp.src('./app/views/*.jade')
    .pipe(livereload());
});




gulp.task('js', function () {

	 return gulp.src(jsFiles)
  	.pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(livereload());

});






gulp.task('less', function() {

	  gulp.src(lessFiles)
		.pipe(less({plugins: [autoprefix, cleancss]}))
		.pipe(gulp.dest('./public/css'))
    .pipe(livereload());

});


gulp.task('default', ['watch'], function () {

  nodemon({ script: 'app.js' })
    .on('change', ['js','less'])
    .on('restart', function () {
    });

});
