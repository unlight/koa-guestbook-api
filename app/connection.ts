import { createConnection, Connection, ConnectionOptions, getConnectionManager } from 'typeorm';
import * as Router from 'koa-router';
import * as Koa from 'koa';
import { Category } from './category/category';
import { Message } from './message/message';

export function createDefaultConnection(options?): Promise<Connection> {
    return createConnection({
        type: 'sqlite',
        database: process.env.TYPEORM_STORAGE as string,
        entities: [
            Category,
            Message,
        ],
        autoSchemaSync: false,
        logging: options && options.logQueries,
        cli: {
            migrationsDir: `${__dirname}/migrations`
        },
    });
}

export function connection(): Koa.Middleware {
    return async function(k: Koa.Context, next: any) {
        let connection = await createDefaultConnection();
        await next();
        connection.close();
    };
}

export async function closeConnection() {
    const cm = getConnectionManager();
    await cm.has('default') && cm.get('default').close();
}

export async function openConnection() {
    await createDefaultConnection();
}

export async function createPersistentConnection() {
    const cm = getConnectionManager();
    let connection: Connection = !cm.has('default') ? await createDefaultConnection() : cm.get('default');
    return async () => {
        await connection.close();
    };
}
