import 'reflect-metadata';
import * as Koa from 'koa';
import { connection, createPersistentConnection } from './connection';
import { errorHandler } from './error-handler';
import { homeRoutes } from './home/home';
import { categoryRoutes } from './category/category.api';
import { messageRoutes } from './message/message.api';
const bodyParser = require('koa-bodyparser');

export const app = new Koa();
const startServer = (module.parent === null);
let connectionSubscription;

if (process.env.NODE_ENV !== 'production') {
    const koaResponseTime = require('koa-response-time');
    app.use(koaResponseTime());
}
app.use(errorHandler());
app.use(bodyParser());
if (startServer) {
    // app.use(connection());
    (async () => {
        connectionSubscription = await createPersistentConnection();
    })();
}
app.use(homeRoutes());
app.use(categoryRoutes());
app.use(messageRoutes());

if (startServer) {
    const server = app.listen(3007, () => {
        console.log(`Server started - http://localhost:3007`);
    });
    server.on('close', async () => {
        await connectionSubscription && connectionSubscription();
        console.log(`Server stopped`);
    });
    process.on('SIGINT', async () => {
        server.close();
    });
}
