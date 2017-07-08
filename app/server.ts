import 'reflect-metadata';
import * as Koa from 'koa';
import { connection } from './connection';
import { errorHandler } from './error-handler';
import { homeRoutes } from './home/home';
const bodyParser = require('koa-bodyparser');

export const app = new Koa();

if (process.env.NODE_ENV !== 'production') {
    const koaResponseTime = require('koa-response-time');
    app.use(koaResponseTime());
}
app.use(errorHandler());
app.use(bodyParser());
app.use(connection());
app.use(homeRoutes());

if (module.parent === null) {
    const server = app.listen(3007, () => {
        console.log(`Server started - http://localhost:3007`);
    });
}
