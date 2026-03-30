import jwt from 'jsonwebtoken'
import {UserModel} from '../models/login.model.js';

export const LoginController = {
    checkUser: (username, password) => {
        let user = UserModel.getUser(username);

        if (!user || user.password !== password) return false;     // simple (pas sécurisé mais OK pour projet)

        user = {
            id: user.id,
            name: user.name,
            username: user.username,
        }
        // create jwt
        const token = generateAccessToken(user);

        return {user_id: user.id, token: token};
    }
};

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
}