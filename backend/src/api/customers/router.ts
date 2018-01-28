import * as express from 'express';

import {ServerOptions} from "../../server-options";
import {getAllCustomers, addCustomer, getCustomer, updateCustomer} from "./repository";
import {createdResponse} from "../general/routing/created-response";
import {noContentResponse} from "../general/routing/no-content-response";
import {jsonResponse} from "../general/routing/json-response";

export function createCustomersRouter(serverOptions: ServerOptions): express.Router {
    const router = express.Router();
    router.get('/customers', async (req, res) => {
        jsonResponse({ items: await getAllCustomers(serverOptions) }, res);
    });

    router.get('/customers/:id', async (req, res) => {
        const id = Number(req.params.id);
        jsonResponse(await getCustomer(id, serverOptions), res);
    });

    router.post('/customers', async (req, res) => {
        const customer = await addCustomer(req.body, serverOptions);
        createdResponse(req, res, customer.id, serverOptions);
    });

    router.put('/customers/:id', async (req, res) => {
        const id = Number(req.params.id);
        const customer = {...req.body, id: id};
        await updateCustomer(customer, serverOptions);
        noContentResponse(res);
    })

    return router;
}