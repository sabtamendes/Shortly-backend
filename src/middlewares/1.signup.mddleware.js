import connection from "../database/database.js";
import { signUpSchema } from "../schemas/signup.schemas.js";

export async function validSignUp(req, res, next) {
    const { name, email, password, passwordConfirm } = req.body;

    const { error } = signUpSchema.validate(name, email, password, passwordConfirm, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {

        const emailInUse = await connection.query("SELECT * FROM users WHERE email = $1;", [email]);

        if (emailInUse[0].rows) {
            return res.sendStatus(409);
        }

        res.locals.body = name, email, password, passwordConfirm;

        next();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}