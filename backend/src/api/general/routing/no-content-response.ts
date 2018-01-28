import * as express from 'express';

export function noContentResponse(res: express.Response): void {
    res.status(204).end();
}