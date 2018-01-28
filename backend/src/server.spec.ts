import * as http from "http";
import * as fetch from 'isomorphic-fetch';
import {expect} from 'chai';

import {setupServer, teardownServer} from "../testing/test-server";

describe('Server', () => {
    let httpServer: http.Server;

    before(() => {
        httpServer = setupServer()
    })

    it('should be ok', async () => {
        const response = await fetch('http://localhost:9000/');
        expect(response.ok).to.eql(true);
    })

    after(async () => {
        await teardownServer(httpServer);
    })
})