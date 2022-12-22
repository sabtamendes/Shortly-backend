import { insertSessions } from "../repositories/02.signin.repositories.js";

export async function postSignIn(req, res) {
    const token = res.locals.token;
    const id = res.locals.id;
    try {

        await insertSessions(token, id);

        res.status(200).send({ token });

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}