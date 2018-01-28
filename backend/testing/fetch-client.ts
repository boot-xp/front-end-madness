import * as fetch from 'isomorphic-fetch';

export function getJson<T>(url: string): Promise<T> {
    return fetch(url)
        .then(res => res.json());
}

export function postJson(url: string, data: object) {
    return fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    });
}

export function putJson(url: string, data: object) {
    return fetch(url, {
        body: JSON.stringify(data),
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        }
    })
}