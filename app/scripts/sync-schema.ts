import { Connection } from 'typeorm';

export async function run(connection: Connection): Promise<any> {
    return connection.syncSchema(false);
}
