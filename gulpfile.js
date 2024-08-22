const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// automação de compilação do sass
function compileSass() {
    return gulp.src('src/scss/**/*.scss') //seleciona todos os arquivos sass
        .pipe(sass({ outputStyle: 'compressed' })) //compila os arquivos sass minificados
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'], //prefixa os arquivos sass para os últimos 2 versões do navegador
            cascade: false //não faz o prefixo para os arquivos sass que não foram modificados
        })) //adiciona prefixos aos arquivos
        .pipe(gulp.dest('dist/css/')) //salva os arquivos em css
        .pipe(browserSync.stream()); //atualiza o navegador assim que atualiza o arquivo
}
gulp.task('sass', compileSass); //executa a tarefa

// automação de atualização do navegador
function browser() {
    browserSync.init({
        server: {
            baseDir: './' //pasta que será monitorada
        }
    });
}
gulp.task('browser-sync', browser);

// automação do watch
function watch() {
    gulp.watch('src/scss/**/*.scss', compileSass); //monitora os arquivos alterados
    gulp.watch('*.html').on('change', browserSync.reload); //monitora os arquivos html e atualiza o navegador
}
gulp.task('watch', watch);

gulp.task('default', gulp.parallel('sass', 'watch', 'browser-sync')); //executa as tarefas em paralelo
