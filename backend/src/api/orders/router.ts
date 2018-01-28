import * as express from 'express';
import {Router} from "express";

import {ServerOptions} from "../../server-options";

export function createOrdersRouter(serverOptions: ServerOptions): express.Router {
    const router = Router();
    router.get('/orders', (req, res) => {
        res.json({ items: [] });
    })
    return router;
}