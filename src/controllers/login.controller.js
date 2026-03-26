import { UserModel } from '../models/login.model.js';

export const LoginController = {
    checkUser: (username, password) => {
        const user = UserModel.getUser(username);

        if (!user || user.password !== password) return false;     // simple (pas sécurisé mais OK pour projet)

        return user.id;
    }
};