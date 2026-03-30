import { Database } from "bun:sqlite";

const db = new Database(":memory:");

export const LoginModel = {

}

export const UserModel = {
    getUser: (username) => {
        return db.prepare(
            "SELECT * FROM clients WHERE username = ? LIMIT 1"
        ).get(username);
    }
};