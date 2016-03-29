var gulp = require('gulp'),
    usemin = require('gulp-usemin'),        //  用来将HTML文件中（或者templates/views）中没有优化的script 和stylesheets 替换为优化过的版本

    connect = require('gulp-connect'),      // 简单的web server, 用于刷新页面
    watch = require('gulp-watch'),          // 监听任务, 一般都要
    sourcemaps = require('gulp-sourcemaps'),// 谷歌调试神器
    minifyCss = require('gulp-cssnano'),    // 压缩css
    minifyJs = require('gulp-uglify'),      // 压缩js
    concat = require('gulp-concat'),        // 合并js
    less = require('gulp-less'),            // 编译 less
    rename = require('gulp-rename'),        // 重命名
    minifyHTML = require('gulp-htmlmin');   // 压缩html

// 源路径
var paths = {
    scripts: 'src/js/**/*.*',
    styles: 'src/less/**/*.*',
    images: 'src/img/**/*.*',
    templates: 'src/templates/**/*.html',
    index: 'src/index.html',
    bower_fonts: 'src/components/**/*.{ttf,woff,woff2,eof,svg}'
};
// 发布路径
var destPath = {};

/*
* 调试输出路径
* */
gulp.task('dev-dest-config', function() {
    destPath = {
        dest: 'debug',
        libDest: 'debug/lib',
        jsDest: 'debug/js',
        cssDest:'debug/css',
        imgDest: 'debug/img',
        tmplDest:'debug/templates'
    };
});

/**
 * 发布输出路径
 * */
gulp.task('dest-config', function() {
    destPath = {
        dest: 'dist',
        libDest: 'dist/lib',
        jsDest: 'dist/js',
        cssDest:'dist/css',
        imgDest: 'dist/img',
        tmplDest:'dist/templates'
    };
});

/**
 * 替换html 里的路径
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat']
        }))
        .pipe(gulp.dest(destPath.dest));
});

/**
 * 拷贝资源
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest(destPath.libDest));
});

/**
 * 发布路径执行合并
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(destPath.imgDest));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())// 所有插件在 init 和 write 之间, 需要插件支持
        .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(sourcemaps.write('.'))// 当前目录生成 .map 文件
        .pipe(gulp.dest(destPath.jsDest));
});

gulp.task('custom-js-debug', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest(destPath.jsDest));
});

gulp.task('custom-less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest(destPath.cssDest));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest(destPath.tmplDest));
});

/**
 * 调试路径执行合并
 * */
gulp.task('build-custom-debug', ['custom-images', 'custom-js-debug', 'custom-less', 'custom-templates']);


/**
 * 监听文件变动
 */
gulp.task('watch', function() {
    gulp.watch(paths.images, ['custom-images']);
    gulp.watch(paths.styles, ['custom-less']);
    gulp.watch(paths.scripts, ['custom-js']);
    gulp.watch(paths.templates, ['custom-templates']);
    gulp.watch(paths.index, ['usemin']);
});

gulp.task('watch-debug', function() {
    gulp.watch(paths.images, ['custom-images']);
    gulp.watch(paths.styles, ['custom-less']);
    gulp.watch(paths.scripts, ['custom-js-debug']);
    gulp.watch(paths.templates, ['custom-templates']);
    gulp.watch(paths.index, ['usemin']);
});

/**
 * 自动刷新, 没什么卵用
 */
gulp.task('webserver', function() {
    connect.server({
        root: destPath.dest,
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', function() {
    gulp.src(['dist/**/*.*'])
        .pipe(watch([destPath.dest + '/**/*.*']))
        .pipe(connect.reload());
});


/**
 * Gulp tasks
 */
gulp.task('debug', ['dev-dest-config', 'usemin', 'build-assets', 'build-custom-debug', 'watch-debug']);

gulp.task('build', ['dest-config', 'usemin', 'build-assets', 'build-custom', 'watch']);
gulp.task('default', ['build']);