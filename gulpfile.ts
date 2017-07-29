/// <reference path="node_modules/@types/node/index.d.ts" />
/// <reference path="node_modules/typescript/lib/lib.es2015.d.ts" />
import * as fs from 'fs';
const gulp = require('gulp');
const g = require('gulp-load-plugins')();

function sourceLint() {
    return g.eslint();
}

function specLint() {
    return g.eslint({
        rules: {
            'jasmine/no-spec-dupes': 0,
            'lodash/import-scope': 0,
            'prefer-const': 0,
            'import/no-duplicates': 0,
            'import/max-dependencies': 0,
        }
    });
}

gulp.task('eslint', () => {
    return gulp.src('app/**/*.ts', { since: g.memoryCache.lastMtime('ts') })
        .pipe(g.memoryCache('ts'))
        .pipe(g.ignore.exclude('*.d.ts'))
        .pipe(g.if('*.spec.ts', specLint(), sourceLint()))
        .pipe(g.eslint.format());
});

gulp.task('eslint:w', (done) => {
    let w = gulp.watch('app/**/*.ts', { ignoreInitial: false }, gulp.series('eslint'));
    w.on('change', g.memoryCache.update('ts'));
    process.on('SIGINT', () => {
        w.close();
        done();
    });
});
