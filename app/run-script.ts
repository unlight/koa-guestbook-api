import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { getConnection } from './connection';

let [name] = process.argv.slice(-1);
const { run } = require(`./scripts/${name}`);

(async function () {
    const connection = await getConnection({ logQueries: true });
    await run(connection);
    await connection.close();
})();


