import * as Loki from 'lokijs';
import * as Bluebird from 'bluebird';

import {ServerOptions} from "../../../server-options";

export async function getAll<T extends object>(collectionName: string, opts: ServerOptions): Promise<T[]> {
    const collection = await getOrAddCollection<T>(collectionName, opts);
    return collection.find();
}

export async function add<T extends object>(entity: T, collectionName: string, opts: ServerOptions): Promise<T> {
    const db = await getDb(opts);
    const collection = await getOrAddCollection<T>(collectionName, opts, db);
    const added = collection.insert(entity);
    await save(db);
    await close(db);
    return added;
}

async function save(db: Loki): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.saveDatabase(err => {
           if (err)
               reject(err);
           else
               resolve();
        });
    })
}

async function close(db: Loki): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.close(err => {
            if (err)
                reject(err);
            else
                resolve();
        })
    })
}

async function getDb(opts: ServerOptions): Promise<Loki> {

    return new Promise<Loki>((resolve, reject) => {
        const db = new Loki(opts.storagePath);
        db.loadDatabase(undefined,(err) => {
            if (err)
                reject(err);
            else
                resolve(db);
        })
    });
}

async function getOrAddCollection<T extends object>(name: string, opts: ServerOptions, db: Loki = null): Promise<Loki.Collection<T>> {
    db = db || await getDb(opts);

    if (!db.collections.find(c => c.name === name))
        db.addCollection(name);

    return db.getCollection<T>(name);
}