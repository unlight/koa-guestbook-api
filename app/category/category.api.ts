import * as Router from 'koa-router';
import { getEntityManager } from 'typeorm';
import { Category } from './category';

export async function browse(k: Router.IRouterContext, next) {
    const em = getEntityManager();
    const categoryRepository = em.getRepository(Category);
    k.body = await categoryRepository.find();
    next();
}

export function categoryRoutes() {
    return new Router()
    .prefix('/category')
    .get('/browse', browse)
    .routes();
}
