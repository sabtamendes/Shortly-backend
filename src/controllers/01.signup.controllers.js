import pgConnection from "../database/database.js";
import bcrypt from "bcrypt";

export async function postSignup(req, res) {
    const { name, email, password } = res.locals.user;

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        await pgConnection.query('INSERT INTO users (name, email,password) VALUES ($1, $2, $3);', [name, email, passwordHash]);

        res.sendStatus(201);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}