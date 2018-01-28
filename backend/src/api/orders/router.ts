import * as express from 'express';
import {Router} from "express";

import {ServerOptions} from "../../server-options";
import {addOrder, getAllOrders, getOrder, updateOrder} from "./repository";
import {createdResponse} from "../general/routing/created-response";
import {jsonResponse} from "../general/routing/json-response";
import {noContentResponse} from "../general/routing/no-content-response";

export function createOrdersRouter(serverOptions: ServerOptions): express.Router {
    const router = Router();
    router.get('/orders', async (req, res) => {
        jsonResponse({ items: await getAllOrders(serverOptions) }, res);
    })

    router.get('/orders/:id', async (req, res) => {
        const id = Number(req.params.id);
        jsonResponse(await getOrder(id, serverOptions), res);
    })

    router.post('/orders', async (req, res) => {
        const order = await addOrder(req.body, serverOptions);
        createdResponse(req, res, order.id, serverOptions);
    })

    router.put('/orders/:id', async (req, res) => {
        const id = Number(req.params.id);
        const order = {...req.body, id: id};
        await updateOrder(order, serverOptions);
        noContentResponse(res);
    });
    return router;
}