import * as express from 'express';
import {ServerOptions} from "../server-options";
import {createCustomersRouter} from "./customers/router";
import {createOrdersRouter} from "./orders/router";
import {createProductsRouter} from "./products/router";

export function createRootRouter(opts: ServerOptions): express.Router {
    const apiRouter = express.Router();

    apiRouter.get('/', (req, res) => {
        res.status(200).end();
    });

    apiRouter.use('/api', createCustomersRouter(opts));
    apiRouter.use('/api', createOrdersRouter(opts));
    apiRouter.use('/api', createProductsRouter(opts));
    return apiRouter;
}