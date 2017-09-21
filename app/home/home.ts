import * as Router from 'koa-router';
import { resolve } from 'path';
import { inject } from 'njct';

export async function home(k: Router.IRouterContext, next: any) {
    const readJson = inject('readJson', () => require('jsonfile').readFileSync);
    const pkg = readJson(resolve('package.json'));
    k.body = {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
    };
    next();
}

export function homeRoutes() {
    return new Router()
        .get('/', home)
        .routes();
}
