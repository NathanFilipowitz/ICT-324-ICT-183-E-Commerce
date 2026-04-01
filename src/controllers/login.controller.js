import jwt from 'jsonwebtoken'
import {UserModel} from '../models/login.model.js';
import bcrypt from 'bcrypt';

export const LoginController = {
    checkUser: async (username, password) => {
        const user = await UserModel.getUser(username);
        if (!user) return false;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return false;

        const safeUser = {
            id: user.id,
            username: user.username,
            firstname: user.firstname
        };

        const token = jwt.sign(safeUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        return { user_id: user.id, token };
    }
};

function generateAccessToken(user) {
    console.log(process.env.ACCESS_TOKEN_SECRET)
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
}



export const RegisterController = {
    register: async (username, firstname, password) => {
        const existingUser = await UserModel.getUser(username);
        if (existingUser) {
            throw new Error("Utilisateur déjà existant");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const newUser = await UserModel.createUser({
            username,
            firstname,
            password: hashedPassword
        });

        return newUser;
    }
};


