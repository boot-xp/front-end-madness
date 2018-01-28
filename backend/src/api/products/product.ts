import {Entity} from "../general/storage/entity";

export interface Product extends Entity{
    name?: string;
    retailPrice?: number;
    wholesalePrice?: number;
}