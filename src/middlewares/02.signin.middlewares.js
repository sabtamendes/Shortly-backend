import { signInSchema } from "../schemas/02.signin.schemas.js";
import bcrypt from "bcrypt";
import pgConnection from "../database/database.js";
import { v4 as uuidv4 } from "uuid";

export async function signinValidation(req, res, next) {
    const { email, password } = req.body;

    const token = uuidv4();

    const { error } = signInSchema.validate({ email, password }, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const userAccount = await pgConnection.query("SELECT * FROM users WHERE email = $1;", [email]);

        if (userAccount.rowCount === 0) {
            return res.sendStatus(401);
        }
        
         const passwordValid = bcrypt.compareSync(password, userAccount.rows[0].password);

         if (!passwordValid) {
             return res.sendStatus(401);
         }

         //não é uma rpta autenticada
        // const inASession = await pgConnection.query("SELECT token FROM sessions WHERE token = $1 AND active = true;", [token]);

        // if (inASession.rowCount !== 0) {
        //     return res.sendStatus(401)
        // }

        res.locals.token = token;
        res.locals.id = userAccount.rows[0].id;
        next();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}