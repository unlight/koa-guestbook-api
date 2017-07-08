import { app } from '../server';
import { Server } from 'http';

import supertest = require('supertest');

describe('home endpoint', () => {

    let server: Server;

    beforeEach(() => {
        server = app.listen();
    });

    afterEach(() => {
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

});
