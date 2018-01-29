import {Product} from "./product";
import {ServerOptions} from "../../server-options";
import {add, getAll, getById, update} from "../general/storage/repository";

const COLLECTION_NAME = 'products';

export async function getAllProducts(serverOptions: ServerOptions): Promise<Product[]> {
    return await getAll<Product>(COLLECTION_NAME, serverOptions);
}

export async function getProduct(id: number, serverOptions: ServerOptions): Promise<Product> {
    return await getById<Product>(id, COLLECTION_NAME, serverOptions);
}

export async function addProduct(product: Product, serverOptions: ServerOptions): Promise<Product> {
    return await add<Product>(product, COLLECTION_NAME, serverOptions);
}

export async function updateProduct(product: Product, serverOptions: ServerOptions): Promise<void> {
    return await update<Product>(product, COLLECTION_NAME, serverOptions);
}