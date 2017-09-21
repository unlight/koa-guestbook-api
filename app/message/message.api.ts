import * as Router from 'koa-router';
import { getEntityManager, getRepository } from 'typeorm';
import { Message } from './message';
import { MessageModel } from './message.model';
import { Category } from '../category/category';

export async function create(k: Router.IRouterContext, next) {
    const body = k.request['body'];
    const isValid = MessageModel.validate(body, errors => {
        k.status = 400;
        k.body = errors.map(e => e.message);
    });
    if (!isValid) {
        return next();
    }
    const messageRepository = getRepository(Message);
    const categoryRepository = getRepository(Category);
    if (body.category) {
        // TODO: Get category.
        // const category = await categoryRepository.findOneById(body.category);
        // if (category) {
        //     k.status = 400;
        // }
    }
    const entity = Object.assign(new Message(), body, { dateInserted: new Date().toISOString() });
    await messageRepository.save(entity);
    k.status = 201;
    k.body = { message: 'Message successfully created' };
    next();
}

export async function update(k: Router.IRouterContext, next) {
    const messageRepository = getRepository(Message);
    const entity = await messageRepository.findOneById(k.params.id);
    if (!entity) {
        k.status = 404;
        return next();
    }
    const body = k.request['body'];
    const isValid = MessageModel.validate(body, errors => {
        k.status = 400;
        k.body = errors.map(e => e.message);
    });
    if (!isValid) {
        return next();
    }
    Object.assign(entity, body, { dateUpdated: new Date().toISOString() });
    try {
        await messageRepository.save(entity)
    } catch (err) {
        k.status = 500;
        return next(err);
    }
    k.status = 200;
    k.body = { message: 'Message successfully updated' };
    next();
}

export function messageRoutes() {
    return new Router()
        .prefix('/message')
        .post('/create', create)
        .post('/update/:id', update)
        .routes();
}
