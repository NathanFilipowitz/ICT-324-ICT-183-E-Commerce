import {db} from '../models/db.ts'


export const LoginModel = {

}

export const UserModel = {
    getUser: (username) => {
        return db.prepare(
            "SELECT * FROM clients WHERE name = ? LIMIT 1"
        ).get(username);
    }
};