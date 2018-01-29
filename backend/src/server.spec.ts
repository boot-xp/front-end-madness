import * as http from "http";
import * as fetch from 'isomorphic-fetch';
import {expect} from 'chai';

import {setupServer, tearDownServer} from "../testing/test-server";

describe('Server', () => {
    let httpServer: http.Server;
    let baseUrl: string;

    before(() => {
        const result = setupServer()
        httpServer = result.httpServer;
        baseUrl = result.baseUrl;
    })

    it('should be ok', async () => {
        const response = await fetch(`${baseUrl}/`);
        expect(response.ok).to.eql(true);
    })

    after(async () => {
        await tearDownServer(httpServer);
    })
})