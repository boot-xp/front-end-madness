import * as express from 'express';
import {ServerOptions} from "../../../server-options";

export function createdResponse(req: express.Request, res: express.Response, newId: any, serverOptions: ServerOptions): void {
    res.status(201)
        .setHeader('Location', `${req.protocol}://${req.hostname}:${serverOptions.port}${req.originalUrl}/${newId}`);
    res.end();
}