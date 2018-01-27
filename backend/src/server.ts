import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as http from "http";

import {defaultOptions, ServerOptions} from "./server-options";
import {createRootRouter} from "./api/router";
import bodyParser = require("body-parser");

export function startServer(opts?: ServerOptions): http.Server {
    opts = opts || defaultOptions;

    const app = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(morgan('\':method :url :status :res[content-length] - :response-time ms\''));
    app.use(createRootRouter(opts));

    return app.listen(opts.port, () => {
        console.debug(`Now listening at http://localhost:${opts.port}`);
    })
}

export function stopServer(server: http.Server): void {
    server.close(() => {
        console.debug('Stopped http server.');
    })
}