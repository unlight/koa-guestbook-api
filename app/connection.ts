import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import * as Router from 'koa-router';
import * as Koa from 'koa';

export function getConnection(options?): Promise<Connection> {
    return createConnection({
        driver: {
            type: process.env.TYPEORM_DRIVER_TYPE,
            storage: process.env.TYPEORM_STORAGE
        },
        autoSchemaSync: false,
        logging: {
            logQueries: options && options.logQueries
        }
    } as ConnectionOptions);
}

export function connection(): Koa.Middleware {
    return async function(k: Koa.Context, next) {
        let connection = await getConnection();
        await next();
        connection.close();
    };
}
