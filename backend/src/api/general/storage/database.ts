import * as Loki from "lokijs";
import {ServerOptions} from "../../../server-options";
import {Entity} from "./entity";

export async function save(db: Loki): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.saveDatabase(err => {
            if (err)
                reject(err);
            else
                resolve();
        });
    })
}

export async function close(db: Loki): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.close(err => {
            if (err)
                reject(err);
            else
                resolve();
        })
    })
}

export async function getDb(opts: ServerOptions): Promise<Loki> {
    return new Promise<Loki>((resolve, reject) => {
        const db = new Loki(opts.storagePath);
        db.loadDatabase(undefined, (err) => {
            if (err)
                reject(err);
            else
                resolve(db);
        })
    });
}

export async function getOrAddCollection<T extends object & Entity>(name: string, opts: ServerOptions, db: Loki = null): Promise<Loki.Collection<T>> {
    db = db || await getDb(opts);

    if (!db.collections.find(c => c.name === name))
        db.addCollection(name);

    return db.getCollection<T>(name);
}