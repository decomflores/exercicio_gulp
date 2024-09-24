// Importar os módulos
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

// Caminhos dos arquivos
const paths = {
    sass: {
        src: 'source/styles/*.scss',
        dest: 'build/styles'
    },
    images: {
        src: 'source/images/*.{jpg,jpeg,png,gif,svg}',
        dest: 'build/images'
    },
    js: {
        src: 'source/scripts/*.js',
        dest: 'build/scripts'
    }
};

// Função assíncrona para comprimir imagens
async function compressImages() {
    const imagemin = (await import('gulp-imagemin')).default;
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Tarefa para compilar o SASS
function compileSass() {
    return gulp.src(paths.sass.src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(paths.sass.dest));
}

// Tarefa para comprimir o código JavaScript
function compressJs() {
    return gulp.src(paths.js.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest));
}

// Tarefa para observar mudanças
function watchFiles() {
    gulp.watch(paths.sass.src, compileSass);
    gulp.watch(paths.images.src, compressImages);
    gulp.watch(paths.js.src, compressJs);
}

// Exportar as tarefas
exports.compileSass = compileSass;
exports.compressImages = compressImages;
exports.compressJs = compressJs;
exports.watch = gulp.series(compileSass, compressImages, compressJs, watchFiles);

// Tarefa padrão (default)
exports.default = exports.watch;
