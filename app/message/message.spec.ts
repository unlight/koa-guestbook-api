import { MessageModel } from './message.model';
import * as assert from 'assert';
import { Message } from './message';
import { openConnection, closeConnection } from '../connection';
import { getEntityManager, getRepository } from 'typeorm';
import { create } from './message.api';
import { app } from '../server';
import { Server } from 'http';
import supertest = require('supertest');

describe('message:', () => {

    describe('model:', () => {

        it('smoke', () => {
            assert(MessageModel);
        });

        it('empty should fail', () => {
            assert.throws(() => {
                new MessageModel();
            });
        });

        it('should be ok', () => {
            let m: Message = {
                author: 'Zenaida',
                body: 'fulham Fourierian mailbox euphone subphylum commissary',
            };
            new MessageModel(m);
        });

    });

    describe('api:', () => {

        let server: Server;

        before(async () => {
            server = app.listen();
            await openConnection();
        });

        after(async () => {
            server.close();
            await closeConnection();
        });

        it('smoke save', async () => {
            let entity: Message = {
                author: 'Launa',
                body: 'Foo',
            };
            let model = new MessageModel(entity);
            let m = Object.assign(new Message(), model, { dateInserted: '2015-02-01' });
            const repository = getRepository(Message);
            await repository.save(m);
        });

        it('with errors', () => {
            const k = {
                request: {
                    body: {}
                }
            } as any;
            create(k, () => { });
            assert.equal(k.status, 400);
        });

        it('post /message/create', (done) => {
            supertest(server)
                .post('/message/create')
                .type('form')
                .send({ body: 'Manny', author: 'cat' })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    done(err);
                });
        });

    });
});
