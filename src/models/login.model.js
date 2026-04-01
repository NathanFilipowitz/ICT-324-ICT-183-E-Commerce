import { Database } from "bun:sqlite";

const db = new Database('shop.sqlite');

export const UserModel = {
    getUser: (username) => {
        return db
            .prepare('SELECT * FROM clients WHERE username = ? LIMIT 1')
            .get(username);
    },

    createUser: async ({ username, firstname, password }) => {
        console.log("Avant INSERT:", { firstname, username, password });
        const stmt = db.prepare(
            'INSERT INTO clients (name, username, password) VALUES (?, ?, ?)'
        );
        console.log("Préparation valide");
        const info = stmt.run(username, firstname, password);
        return {
            id: info.lastInsertRowid,
            username,
            firstname
        };
    }
};
