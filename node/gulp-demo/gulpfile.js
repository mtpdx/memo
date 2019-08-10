/* 
gulp.src();     // 获取任务要处理文件
gulp.dest();    // 输出文件
gulp.task();    // 建立gulp任务
gulp.watch();  // 监控文件变化
*/

const gulp = require('gulp');

gulp.task('task_name', () => {
    gulp.src('./src/dy-jd/css/da_jd.css')
        .pipe(gulp.dest('dist/css'));
});
// cli:  gulp task_name

// html
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
gulp.task('htmlmin', () => {
    gulp.src('./src/dy-jd/*.html')
        .pipe(fileinclude())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

// fileinclude  公共代码抽取
gulp.task('fileinclude', () => {
    gulp.src('./src/dy-jd/*.html')
        .pipe(fileinclude())
        .pipe(gulp.dest('dist'));
});

// css
const less = require('gulp-less');
const csso = require('gulp-csso');
gulp.task('cssmin', () => {
    // 选择css目录下的所有less文件以及css文件
    gulp.src(['./src/dy-jd/css/*.less', './src/dy-jd/css/*.css'])
        // 将less语法转换为css语法
        .pipe(less())
        // 将css代码进行压缩
        .pipe(csso())
        // 将处理的结果进行输出
        .pipe(gulp.dest('dist/css'))
});


// babel  uglify
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
gulp.task('jsmin', () => {
    gulp.src('./src/dy-jd/js/*.js')
        .pipe(babel({
            // 它可以判断当前代码的运行环境 将代码转换为当前运行环境所支持的代码
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// 复制文件夹
gulp.task('copy', () => {

    gulp.src('./src/images/*')
        .pipe(gulp.dest('dist/images'));

    gulp.src('./src/uploads/*')
        .pipe(gulp.dest('dist/uploads'))
});

// 构建任务
gulp.task('default', gulp.series('htmlmin', 'cssmin', 'jsmin', 'copy', ()=>{
    console.log('gulp task done ! ^_^');
}));