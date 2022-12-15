import bcrypt from "bcrypt";
import connection from "../database/database.js";
import { signInSchema } from "../schemas/signin.schemas.js";

export async function validSignIn(req, res, next) {
    const { email, password } = req.body;
    
    const { error } = signInSchema.validate(email, password, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const doesntMatch = await connection.query("SELECT email, password FROM users WHERE email = $1 AND password = $2;", [email, password])

        if (!doesntMatch[0].rows) {
            return res.sendStatus(401);
        }

        const validPassword = bcrypt.compareSync(password, doesntMatch[0].rows.password);

        if (!validPassword) {
            return res.sendStatus(401);
        }

        res.locals.body = email, password;

        next();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}