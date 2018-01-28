import {Entity} from "../general/storage/entity";
import {Address} from "../general/models/address";
import {OrderLineItem} from "./order-line-item";

export interface Order extends Entity {
    orderDate?: Date;
    customerId?: number;
    deliveryAddress?: Address;
    billingAddress?: Address;
    lineItems?: OrderLineItem[];
}

