import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { createDefaultConnection } from './connection';

let [name] = process.argv.slice(-1);
const { run } = require(`./scripts/${name}`);

(async function () {
    const connection = await createDefaultConnection({ logQueries: true });
    await run(connection);
    await connection.close();
})();


