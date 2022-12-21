import pgConnection from "../database/database.js";

export async function postSignIn(req, res) {
    const token = res.locals.token;
    const id = res.locals.id;
    try {

        await pgConnection.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2);', [token, id]);

        res.status(200).send({ token });

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}