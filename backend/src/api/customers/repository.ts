import {Customer} from "./customer";
import {ServerOptions} from "../../server-options";
import {add, getAll, getById, getWhere, update} from "../general/storage/repository";
import {Order} from "../orders/order";
import {ORDERS_COLLECTION_NAME} from "../orders/repository";

const CUSTOMERS_COLLECTION_NAME = 'customers';

export async function getAllCustomers(opts: ServerOptions): Promise<Customer[]> {
    return await getAll<Customer>(CUSTOMERS_COLLECTION_NAME, opts);
}

export async function getCustomer(id: number, opts: ServerOptions): Promise<Customer> {
    return await getById<Customer>(id, CUSTOMERS_COLLECTION_NAME, opts);
}

export async function getCustomerOrders(id: number, opts: ServerOptions): Promise<Order[]> {
    return await getWhere<Order & LokiObj>({ customerId: { '$eq': id } }, ORDERS_COLLECTION_NAME, opts);
}

export async function addCustomer(customer: Customer, opts: ServerOptions): Promise<Customer> {
    return await add(customer, CUSTOMERS_COLLECTION_NAME, opts);
}

export async function updateCustomer(customer: Customer, opts: ServerOptions): Promise<void> {
    return await update(customer, CUSTOMERS_COLLECTION_NAME, opts);
}