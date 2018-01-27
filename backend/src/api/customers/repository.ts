import {Customer} from "./customer";
import {ServerOptions} from "../../server-options";
import {add, getAll} from "../general/storage/repository";

export async function getAllCustomers(opts: ServerOptions): Promise<Customer[]> {
    return await getAll<Customer>('customers', opts);
}

export async function addCustomer(customer: Customer, opts: ServerOptions): Promise<Customer> {
    return await add(customer, 'customers', opts);
}