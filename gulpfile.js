const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

// Caminhos dos arquivos
const paths = {
    styles: {
        src: './source/styles/**/*.scss',
        dest: './build/styles/'
    },
    scripts: {
        src: './source/scripts/**/*.js',
        dest: './build/scripts/'
    },
    images: {
        src: './source/images/*',
        dest: './build/images/'
    }
};

// Tarefa para compilar o SASS
function compilaSass() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.styles.dest));
}

// Tarefa para compressão de imagens usando import()
function comprimeImagens() {
    return import('gulp-imagemin').then(imagemin => {
        return gulp.src(paths.images.src)
            .pipe(imagemin.default())
            .pipe(gulp.dest(paths.images.dest));
    });
}

// Tarefa para compressão de JavaScript
function comprimeJS() {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.scripts.dest));
}

// Monitorando mudanças nos arquivos
function watch() {
    gulp.watch(paths.styles.src, compilaSass);
    gulp.watch(paths.scripts.src, comprimeJS);
    gulp.watch(paths.images.src, comprimeImagens);
}

// Exportando as tarefas
exports.compilaSass = compilaSass;
exports.comprimeImagens = comprimeImagens;
exports.comprimeJS = comprimeJS;
exports.watch = watch;

exports.default = gulp.series(compilaSass, comprimeImagens, comprimeJS, watch);
