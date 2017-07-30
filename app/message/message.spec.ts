import { MessageModel } from './message.model';
import * as assert from 'assert';
import { Message } from './message';
import { openConnection, closeConnection } from '../connection';
import { getEntityManager, getRepository } from 'typeorm';

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

    describe('smoke save', () => {

        before(async () => {
            await openConnection();
        });

        after(async () => {
            await closeConnection();
        });

        it('smoke save', async () => {
            let entity: Message = {
                author: 'Launa',
                body: 'Foo',
            };
            let model = new MessageModel(entity);
            let m = Object.assign(new Message(), model, {dateInserted: '2015-02-01'});
            const repository = getRepository(Message);
            await repository.save(m);
        });

    });
});
