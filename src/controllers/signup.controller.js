import connection from "../database/database.js";
import bcrypt from "bcrypt";

export async function postSignUp(req, res) {
    const { name, email, password } = res.locals.body;

    const passwordEncrypted = bcrypt.hashSync(password, 10);

    try {

        await connection.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3);"[name, email, passwordEncrypted]);

        res.sendStatus(201);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}