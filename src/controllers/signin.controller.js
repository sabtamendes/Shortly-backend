import { v4 as uuidV4 } from "uuid";

export async function postSignIn(req, res) {
    const token = uuidV4();

    try {

        res.send({ token }).status(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

}