import * as http from "http";
import {expect} from 'chai';
import {setupServer, tearDownServer} from "../../../testing/test-server";
import {getJson, postJson, putJson} from "../../../testing/fetch-client";
import {Product} from "./product";
import {ResultList} from "../general/models/result-list";

describe('Products', () => {
    let httpServer: http.Server;
    let baseUrl: string;

    before(() => {
        const result = setupServer();
        httpServer = result.httpServer;
        baseUrl = result.baseUrl;
    })

    it('should get products', async () => {
        const result = await getJson<ResultList<Product>>(`${baseUrl}/api/products`);
        expect(result.items).to.eql([]);
    })

    it('should create product', async () => {
        await postJson(`${baseUrl}/api/products`, { name: 'Flamethrower', retailPrice: 12, wholesalePrice: 1 });
        const result = await getJson<ResultList<Product>>(`${baseUrl}/api/products`);
        expect(result.items.length).to.eql(1);
        expect(result.items[0].name).to.eql('Flamethrower');
        expect(result.items[0].retailPrice).to.eql(12);
        expect(result.items[0].wholesalePrice).to.eql(1);
    })

    it('should update product', async () => {
        const response = await postJson(`${baseUrl}/api/products`, { name: 'Java' });
        await putJson(response.headers.get('location'), { retailPrice: 54 });
        const product = await getJson<Product>(response.headers.get('location'));

        expect(product.name).to.eql('Java');
        expect(product.retailPrice).to.eql(54);
    })

    it('should get product', async () => {
        const response = await postJson(`${baseUrl}/api/products`, { name: 'IDK' });
        const product = await getJson<Product>(response.headers.get('location'));
        expect(product.name).to.eql('IDK');
    })

    after(async () => {
        await tearDownServer(httpServer);
    })
})