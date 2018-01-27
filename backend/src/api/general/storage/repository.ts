import {ServerOptions} from "../../../server-options";
import {close, getDb, getOrAddCollection, save} from "./database";

export async function getAll<T extends object>(collectionName: string, opts: ServerOptions): Promise<T[]> {
    const collection = await getOrAddCollection<T>(collectionName, opts);
    return collection.find()
        .map((obj: any) => ({...obj, 'id': obj.$loki}));
}

export async function add<T extends object>(entity: T, collectionName: string, opts: ServerOptions): Promise<T> {
    const db = await getDb(opts);
    const collection = await getOrAddCollection<T>(collectionName, opts, db);
    const added = collection.insert(entity);
    await save(db);
    await close(db);
    return added;
}