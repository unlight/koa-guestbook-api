import { ObjectModel } from 'objectmodel';

export const MessageModel = new ObjectModel({
    id: [Number],
    author: String,
    body: String,
    category: [Number],
});
