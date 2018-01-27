import * as express from 'express';
import {ServerOptions} from "../server-options";
import {createCustomersRouter} from "./customers/router";

export function createRootRouter(opts: ServerOptions): express.Router {
    const apiRouter = express.Router();

    apiRouter.get('/', (req, res) => {
        res.status(200).end();
    });

    apiRouter.use(createCustomersRouter(opts));
    return apiRouter;
}