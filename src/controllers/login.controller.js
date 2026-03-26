import { UserModel } from '../models/login.model.js';

export const LoginController = {
    checkUser: (username, password) => {
        const user = UserModel.getUser(username);

        if (!user) return false;

        return user.password === password; // simple (pas sécurisé mais OK pour projet)
    }
};