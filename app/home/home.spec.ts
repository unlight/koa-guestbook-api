import { app } from '../server';
import { Server } from 'http';
import { home } from './home';
import { inject, injector } from 'njct';
import assert = require('assert');

import supertest = require('supertest');

describe('home:', () => {

    let server: Server;

    before(() => {
        server = app.listen();
    });

    after(() => {
        injector.clear();
        server.close();
    });

    it('respond with json', (done) => {
        supertest(server)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                done(err);
            });
    });

    it('middleware', async () => {
        inject('readJson', () => (file) => ({
            name: 'name',
            version: 'version',
            description: 'description',
        }));
        const k = {} as any;
        home(k, () => { });
        assert.notDeepStrictEqual(k.body, { name: 'name', version: 'version' });
    });
});
