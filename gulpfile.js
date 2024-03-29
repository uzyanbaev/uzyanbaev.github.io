const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
        browser: "chrome"
    });

    gulp.watch("src/**/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.series('styles'));
    gulp.watch("src/**/*.html").on('change', gulp.series('html'));
    gulp.watch("src/js/**/*.js").on('change', gulp.series('scripts'));
    gulp.watch("src/fonts/**/*").on('all', gulp.series('fonts'));
    gulp.watch("src/icons/**/*").on('all', gulp.series('icons'));
    gulp.watch("src/img/**/*").on('all', gulp.series('images'));
    gulp.watch("src/data/**/*").on('change', gulp.series('json'));
    gulp.watch("src/blog/**/*").on('all', gulp.series('blog'));
});

gulp.task('html', function () {
    return gulp.src("src/**/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
});

gulp.task('json', function () {
    return gulp.src("src/data/**/*")
        .pipe(gulp.dest("dist/data"))
        .pipe(browserSync.stream());
});

gulp.task('blog', function () {
    return gulp.src("src/blog/**/*")
        .pipe(gulp.dest("dist/blog"))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'html', 'images', 'json', 'blog'));
