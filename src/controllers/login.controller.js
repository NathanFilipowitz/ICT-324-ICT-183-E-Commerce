import { UserModel } from '../models/login.model.js';

export const LoginController = {
    checkUser: (username, password) => {
        const user = UserModel.getUser(username);

        if (!user || user.password !== password) return false;

        return user.id;
    }
};