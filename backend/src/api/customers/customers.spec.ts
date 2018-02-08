import {ResultList} from "../general/models/result-list";
import {getJson, postJson, putJson} from "../../../testing/fetch-client";
import {Customer} from "./customer";
import {expect} from "chai";
import * as http from "http";
import {setupServer, tearDownServer} from "../../../testing/test-server";
import {Order} from "../orders/order";

describe('Customers', () => {
    let httpServer: http.Server;
    let baseUrl: string;

    before(() => {
        const result = setupServer();
        httpServer = result.httpServer;
        baseUrl = result.baseUrl;
    })

    it('should return empty customers', async () => {
        const result = await getJson<ResultList<Customer>>(`${baseUrl}/api/customers`);
        expect(result).to.eql({ items: [] });
    })

    it('should add customer', async () => {
        await postJson(`${baseUrl}/api/customers`, { name: 'Big C' });
        const result = await getJson<ResultList<Customer>>(`${baseUrl}/api/customers`);

        expect(result.items.length).to.eql(1);
        expect(result.items[0].name).to.eql('Big C');
        expect(result.items[0].id).to.eql(1);
    })

    it('should get customer', async () => {
        const response = await postJson(`${baseUrl}/api/customers`, { name: 'Big C' });
        const customer = await getJson<Customer>(response.headers.get('location'));
        expect(customer.name).to.eql('Big C');
    })

    it('should update customer', async () => {
        const customer = await getJson<ResultList<Customer>>(`${baseUrl}/api/customers`)
            .then(res => res.items[0]);
        customer.name = 'This is a name';

        const putResponse = await putJson(`${baseUrl}/api/customers/${customer.id}`, customer);
        expect(putResponse.ok).to.eql(true);

        const getResponse = await getJson<Customer>(`${baseUrl}/api/customers/${customer.id}`);
        expect(getResponse.name).to.eql('This is a name');
    })

    it('should get orders for customer', async () => {
        const response = await postJson(`${baseUrl}/api/customers`, { name: 'Bob' });
        const customer = await getJson<Customer>(response.headers.get('location'));

        const order: Order = { customerId: customer.id, orderDate: new Date() };
        await postJson(`${baseUrl}/api/orders`, order);
        const result = await getJson<ResultList<Order>>(`${response.headers.get('location')}/orders`);
        expect(result.items.length).to.eql(1);
        expect(result.items[0].customerId).to.eql(customer.id);
        expect(result.items[0].orderDate).to.eql((<Date>order.orderDate).toISOString());
    })

    after(async () => {
        await tearDownServer(httpServer);
    })
})