import {ResultList} from "../general/models/result-list";
import {Order} from "./order";
import {getJson, postJson, putJson} from "../../../testing/fetch-client";
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

    it('should create order', async () => {
        const order: Order = {
            orderDate: new Date(),
            customerId: 3,
            lineItems: [{ productId: 4 }],
            billingAddress: { postalCode: '50035' },
            deliveryAddress: { lineOne: 'bob' }
        };
        await postJson('http://localhost:9000/api/orders', order);
        const result = await getJson<ResultList<Order>>('http://localhost:9000/api/orders');

        expect(result.items.length).to.eql(1);
        expect(result.items[0].orderDate).to.eql((<Date>order.orderDate).toISOString());
        expect(result.items[0].customerId).to.eql(order.customerId);
        expect(result.items[0].lineItems).to.eql(order.lineItems);
        expect(result.items[0].billingAddress).to.eql(order.billingAddress);
        expect(result.items[0].deliveryAddress).to.eql(order.deliveryAddress);
    })

    it('should get order', async () => {
        const response = await postJson('http://localhost:9000/api/orders', { billingAddress: { postalCode: '54' } });
        const order = await getJson<Order>(response.headers.get('location'));
        expect(order.billingAddress).to.eql({ postalCode: '54' });
    })

    it('should update order', async () => {
        const response = await postJson('http://localhost:9000/api/orders', { deliveryAddress: { postalCode: '123' } });
        await putJson(response.headers.get('location'), { billingAddress: { postalCode: '7798' } });
        const order = await getJson<Order>(response.headers.get('location'));
        expect(order.billingAddress).to.eql({ postalCode: '7798' });
        expect(order.deliveryAddress).to.eql({ postalCode: '123' });
    })

    after(async () => {
        await teardownServer(httpServer);
    })
})