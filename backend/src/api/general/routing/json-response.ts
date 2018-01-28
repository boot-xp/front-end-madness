import * as express from 'express';

export function jsonResponse<T>(data: T, res: express.Response): void {
    res.json(data);
}