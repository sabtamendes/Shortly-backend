import bcrypt from "bcrypt";
import { insertUsers } from "../repositories/01.signup.repositories.js";

export async function postSignup(req, res) {
    const { name, email, password } = res.locals.user;

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        await insertUsers(name, email, passwordHash);

        res.sendStatus(201);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}