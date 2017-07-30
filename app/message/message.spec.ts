import { MessageModel } from './message.model';
import * as assert from 'assert';
import { Message } from './message';

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

});
