import {ResultList} from "../general/models/result-list";
import {getJson, postJson, putJson} from "../../../testing/fetch-client";
import {Customer} from "./customer";
import {expect} from "chai";
import * as http from "http";
import {setupServer, teardownServer} from "../../../testing/test-server";

describe('Customers', () => {
    let httpServer: http.Server;

    before(() => {
        httpServer = setupServer()
    })

    it('should return empty customers', async () => {
        const result = await getJson<ResultList<Customer>>('http://localhost:9000/api/customers');
        expect(result).to.eql({ items: [] });
    })

    it('should add customer', async () => {
        await postJson('http://localhost:9000/api/customers', { name: 'Big C' });
        const result = await getJson<ResultList<Customer>>('http://localhost:9000/api/customers');

        expect(result.items.length).to.eql(1);
        expect(result.items[0].name).to.eql('Big C');
        expect(result.items[0].id).to.eql(1);
    })

    it('should get customer', async () => {
        const response = await postJson('http://localhost:9000/api/customers', { name: 'Big C' });
        const customer = await getJson<Customer>(response.headers.get('location'));
        expect(customer.name).to.eql('Big C');
    })

    it('should update customer', async () => {
        const customer = await getJson<ResultList<Customer>>('http://localhost:9000/api/customers')
            .then(res => res.items[0]);
        customer.name = 'This is a name';

        const putResponse = await putJson(`http://localhost:9000/api/customers/${customer.id}`, customer);
        expect(putResponse.ok).to.eql(true);

        const getResponse = await getJson<Customer>(`http://localhost:9000/api/customers/${customer.id}`);
        expect(getResponse.name).to.eql('This is a name');
    })

    after(async () => {
        await teardownServer(httpServer);
    })
})