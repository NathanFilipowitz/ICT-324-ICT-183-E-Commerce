import jwt from 'jsonwebtoken'
import {UserModel} from '../models/login.model.js';
import bcrypt from 'bcrypt';

export const LoginController = {
    checkUser: (username, password) => {
        const cryptedpassword = bcrypt.hashSync(password, 10);
        let user = UserModel.getUser(username);

        if (!user || user.password !== cryptedpassword) return false;

        user = {
            id: user.id,
            name: user.name,
            username: user.username,
        }
        // create jwt
        const token = generateAccessToken(user);
        console.log(token)
        return {user_id: user.id, token: token};
    }
};

function generateAccessToken(user) {
    console.log(process.env.ACCESS_TOKEN_SECRET)
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
}