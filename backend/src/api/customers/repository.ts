import {Customer} from "./customer";
import {ServerOptions} from "../../server-options";
import {add, getAll, getById, update} from "../general/storage/repository";

const COLLECTION_NAME = 'customers';

export async function getAllCustomers(opts: ServerOptions): Promise<Customer[]> {
    return await getAll<Customer>(COLLECTION_NAME, opts);
}

export async function getCustomer(id: number, opts: ServerOptions): Promise<Customer> {
    return await getById<Customer>(id, COLLECTION_NAME, opts);
}

export async function addCustomer(customer: Customer, opts: ServerOptions): Promise<Customer> {
    return await add(customer, COLLECTION_NAME, opts);
}

export async function updateCustomer(customer: Customer, opts: ServerOptions): Promise<void> {
    return await update(customer, COLLECTION_NAME, opts);
}