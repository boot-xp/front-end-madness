import * as express from 'express';

import {ServerOptions} from "../../server-options";
import {getAllCustomers, addCustomer, getCustomer, updateCustomer} from "./repository";

export function createCustomersRouter(serverOptions: ServerOptions): express.Router {
    const router = express.Router();
    router.get('/customers', async (req, res) => {
        res.json({ items: await getAllCustomers(serverOptions) });
    });

    router.get('/customers/:id', async (req, res) => {
        const id = Number(req.params.id);
        res.json(await getCustomer(id, serverOptions));
    });

    router.post('/customers', async (req, res) => {
        const customer = await addCustomer(req.body, serverOptions);
        res.status(201)
            .setHeader('Location', `${req.url}/${customer.id}`);
        res.end();
    });

    router.put('/customers/:id', async (req, res) => {
        const id = Number(req.params.id);
        const customer = {...req.body, id: id};
        await updateCustomer(customer, serverOptions);
        res.status(204).end();
    })

    return router;
}