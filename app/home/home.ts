import * as Router from 'koa-router';
import { resolve } from 'path';
import { inject } from '@epam/inject';

export async function home(k: Router.IRouterContext, next: any) {
    const jsonfile = inject('jsonfile', () => require('jsonfile'));
    const pkg = jsonfile.readFileSync(resolve('package.json'));
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
