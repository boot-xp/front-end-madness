import * as http from "http";
import * as fetch from 'isomorphic-fetch';
import {expect} from 'chai';
import * as fs from 'fs-extra-promise';

import {startServer, stopServer} from "./server";
import * as path from "path";

describe('Server', () => {
    let storagePath: string;
    let httpServer: http.Server;

    before(() => {
        storagePath = path.resolve(__dirname, 'database.spec.db');
        httpServer = startServer({
            port: 9000,
            storagePath
        });
    })

    it('should be ok', async () => {
        const response = await fetch('http://localhost:9000/');
        expect(response.ok).to.eql(true);
    })

    describe('Customers', () => {
        it('should return empty customers', async () => {
            const response = await fetch('http://localhost:9000/api/customers');
            const result = await response.json();
            expect(response.ok).to.eql(true);
            expect(result).to.eql({ items: [] });
        })

        it('should add customer', async () => {
            await fetch('http://localhost:9000/api/customers', {
                body: JSON.stringify({ name: 'Big C' }),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });
            const response = await fetch('http://localhost:9000/api/customers');
            const result = await response.json();
            expect(result.items.length).to.eql(1);
            expect(result.items[0].name).to.eql('Big C');
            expect(result.items[0].id).to.eql(1);
        })
    })

    after(async () => {
        stopServer(httpServer);
        await fs.unlinkAsync(storagePath);
    })
})