import { app } from '../server';
import { Server } from 'http';
import { inject, injector } from 'njct';
import { browse } from './category.api';
import { connection, openConnection, closeConnection } from '../connection';
import assert = require('assert');
import supertest = require('supertest');

describe('category:', () => {

    let server: Server;

    before(async () => {
        server = app.listen();
        await openConnection();
    });

    after(async () => {
        injector.clear();
        server.close();
        await closeConnection();
    });

    it('get /category/browse', (done) => {
        supertest(server)
            .get('/category/browse')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                done(err);
            });
    });

    it('browse api', async () => {
        const k = {} as any;
        await browse(k, () => { });
        assert(k.body);
        assert(k.body.length);
    });
});
