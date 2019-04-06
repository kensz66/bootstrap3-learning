var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

gulp.task('sass', function () {
  gulp.src(['./scss/bootstrap.scss'])
    .pipe(
      sass({
        outputStyle: 'nested', //nested (default), compact, compressed, or expanded
        cascade: true, //是否美化
        remove: true,
        //是否删除不必要的前缀
      })
      .on('error', sass.logError)
    )
    .pipe(concat('./bootstrap.css'))
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: true,
      remove: false
    }))
    .pipe(gulp.dest('./assets/css/'))
    // .on('')
    .pipe(reload({
      stream: true
    }));
  console.log('sass文件发生更新' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
});

gulp.task('default', ['sass'], function () {
  browserSync.init({

    // proxy: "localhost:80"
    server: {
      baseDir: './',
    }
  });
  gulp.watch(['./scss/*.scss', './scss/**/*.*'], ['sass']);
  // gulp.watch(['./scss/test.scss'], ['sass1']);
  gulp.watch(['./*.*', './templets/default/*.*', './include/*.*', './include/**/*.*', './assets/js/*.js', '!./node_modules/', '!./bower_components', '!./yys', '!./uploads', '!./install', '!./.git']).on('change', function (e) {
    reload();
    var d = new Date();
    console.log(e.path + '更新成功:' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());
  });
});