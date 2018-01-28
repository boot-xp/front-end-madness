import {ResultList} from "../general/models/result-list";
import {Order} from "./order";
import {getJson} from "../../../testing/fetch-client";
import {expect} from "chai";
import {setupServer, teardownServer} from "../../../testing/test-server";
import * as http from "http";

describe('Orders', () => {
    let httpServer: http.Server;

    before(() => {
        httpServer = setupServer()
    })

    it('should get orders', async () => {
        const result = await getJson<ResultList<Order>>('http://localhost:9000/api/orders');
        expect(result.items).to.eql([]);
    })

    after(async () => {
        await teardownServer(httpServer);
    })
})