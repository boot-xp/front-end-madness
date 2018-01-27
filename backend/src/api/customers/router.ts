import * as express from 'express';

import {ServerOptions} from "../../server-options";
import {getAllCustomers, addCustomer} from "./repository";

export function createCustomersRouter(opts: ServerOptions): express.Router {
    const router = express.Router();
    router.get('/api/customers', async (req, res) => {
        res.json({ items: await getAllCustomers(opts) });
    });

    router.post('/api/customers', async (req, res) => {
        const customer = await addCustomer(req.body, opts);
        res.status(201)
            .setHeader('Location', `${req.url}/${customer.id}`);
        res.end();
    });

    return router;
}