import * as path from "path";
import {startServer, stopServer} from "../src/server";
import {Server} from "http";
import * as fs from "fs-extra-promise";

const STORAGE_PATH = path.resolve(__dirname, 'database.spec.db');

export function setupServer(): { httpServer: Server, baseUrl} {
    const httpServer = startServer({
        port: 9000,
        storagePath: STORAGE_PATH
    });
    return { httpServer, baseUrl: 'http://localhost:9000' };
}

export async function tearDownServer(server: Server) {
    stopServer(server);
    if (await fs.existsAsync(STORAGE_PATH))
        await fs.unlinkAsync(STORAGE_PATH);
}