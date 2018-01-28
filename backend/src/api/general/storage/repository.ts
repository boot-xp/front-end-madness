import {ServerOptions} from "../../../server-options";
import {close, getDb, getOrAddCollection, save} from "./database";
import {Entity} from "./entity";

export async function getAll<T extends object & Entity>(collectionName: string, opts: ServerOptions): Promise<T[]> {
    const collection = await getOrAddCollection<T>(collectionName, opts);
    return collection.find()
        .map((obj: any) => ({...obj, 'id': obj.$loki}));
}

export async function getById<T extends object & Entity>(id: number, collectionName: string, opts: ServerOptions): Promise<T> {
    const collection = await getOrAddCollection<T>(collectionName, opts);
    return collection.get(id);
}

export async function add<T extends object & Entity>(entity: T, collectionName: string, opts: ServerOptions): Promise<T> {
    const db = await getDb(opts);
    const collection = await getOrAddCollection<T>(collectionName, opts, db);
    const added = collection.insert(entity);
    added.id = added['$loki'];
    await save(db);
    await close(db);
    return added;
}

export async function update<T extends object & Entity>(entity: T, collectionName: string, opts: ServerOptions): Promise<void> {
    const db = await getDb(opts);
    const collection = await getOrAddCollection<T>(collectionName, opts, db);
    const existing = collection.get(entity.id);
    updateProperties<T>(existing, entity);
    collection.update(existing);
    await save(db);
    await close(db);
}

function updateProperties<T extends object & Entity>(existing: T, updated: T): void {
    for (let key in updated) {
        if (updated.hasOwnProperty(key) && key !== 'id' || key !== '$loki')
            existing[key] = updated[key];
    }
}