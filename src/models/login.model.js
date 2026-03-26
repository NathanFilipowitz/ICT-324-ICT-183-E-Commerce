import db from "../../shop.sqlite" with {type: "sqlite"};


export const LoginModel = {

}

export const UserModel = {
    getUser: (username) => {
        return db.prepare(
            "SELECT * FROM clients WHERE username = ? LIMIT 1"
        ).get(username);
    }
};