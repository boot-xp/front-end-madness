import {ServerOptions} from "../../server-options";
import {Order} from "./order";
import {add, getAll, getById, update} from "../general/storage/repository";

export const ORDERS_COLLECTION_NAME = 'orders';

export async function getAllOrders(serverOptions: ServerOptions): Promise<Order[]> {
    return await getAll<Order>(ORDERS_COLLECTION_NAME, serverOptions);
}

export async function getOrder(id: number, serverOptions: ServerOptions): Promise<Order> {
    return await getById<Order>(id, ORDERS_COLLECTION_NAME, serverOptions);
}

export async function addOrder(order: Order, serverOptions: ServerOptions): Promise<Order> {
    return await add<Order>(order, ORDERS_COLLECTION_NAME, serverOptions);
}

export async function updateOrder(order: Order, serverOptions: ServerOptions): Promise<void> {
    return await update<Order>(order, ORDERS_COLLECTION_NAME, serverOptions);
}