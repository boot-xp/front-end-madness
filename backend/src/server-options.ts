import * as path from "path";

export interface ServerOptions {
    port?: number;
    storagePath?: string;
}

export const defaultOptions: ServerOptions = {
    port: 5000,
    storagePath: path.resolve(__dirname, 'database.json')
};