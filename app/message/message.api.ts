import * as Router from 'koa-router';
import { getEntityManager } from 'typeorm';
import { Message } from './message';

export async function create(k: Router.IRouterContext, next) {
    const em = getEntityManager();
    const body = k.request['body'];
    // TODO: validate
    const entity = new Message();
}
