import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import * as Router from 'koa-router';
import * as Koa from 'koa';

export function getConnection(options?): Promise<Connection> {
    return createConnection({
        type: 'sqlite',
        database: process.env.TYPEORM_STORAGE as string,
        entities: [
            `${__dirname}/entities/*.ts`
        ],
        autoSchemaSync: false,
        logging: options && options.logQueries,
        cli: {
            migrationsDir: `${__dirname}/migrations`
        },
    });
}

export function connection(): Koa.Middleware {
    return async function(k: Koa.Context, next) {
        let connection = await getConnection();
        await next();
        connection.close();
    };
}
