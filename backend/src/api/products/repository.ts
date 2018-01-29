import {Product} from "./product";
import {ServerOptions} from "../../server-options";
import {add, getAll, getById, update} from "../general/storage/repository";

const PRODUCTS_COLLECTION_NAME = 'products';

export async function getAllProducts(serverOptions: ServerOptions): Promise<Product[]> {
    return await getAll<Product>(PRODUCTS_COLLECTION_NAME, serverOptions);
}

export async function getProduct(id: number, serverOptions: ServerOptions): Promise<Product> {
    return await getById<Product>(id, PRODUCTS_COLLECTION_NAME, serverOptions);
}

export async function addProduct(product: Product, serverOptions: ServerOptions): Promise<Product> {
    return await add<Product>(product, PRODUCTS_COLLECTION_NAME, serverOptions);
}

export async function updateProduct(product: Product, serverOptions: ServerOptions): Promise<void> {
    return await update<Product>(product, PRODUCTS_COLLECTION_NAME, serverOptions);
}