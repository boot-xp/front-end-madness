import * as express from 'express';
import {ServerOptions} from "../../server-options";
import {jsonResponse} from "../general/routing/json-response";
import {addProduct, getAllProducts, getProduct, updateProduct} from "./repository";
import {createdResponse} from "../general/routing/created-response";
import {noContentResponse} from "../general/routing/no-content-response";

export function createProductsRouter(serverOptions: ServerOptions): express.Router {
    const router = express.Router();

    router.get('/products', async (req, res) => {
        jsonResponse({ items: await getAllProducts(serverOptions) }, res);
    })

    router.get('/products/:id', async (req, res) => {
        const id = Number(req.params.id);
        jsonResponse(await getProduct(id, serverOptions), res);
    })

    router.post('/products', async (req, res) => {
        const product = await addProduct(req.body, serverOptions);
        createdResponse(req, res, product.id, serverOptions);
    })

    router.put('/products/:id', async (req, res) => {
        const id = Number(req.params.id);
        const product = {...req.body, id: id};
        await updateProduct(product, serverOptions);
        noContentResponse(res);
    })

    return router;
}