import pgConnection from "../database/database.js";

export async function tokenValidation(req, res, next) {
    const { authorization } = req.headers;

    try {

        const token = authorization?.replace("Bearer ", "");

        if (!token) {
            console.log("token não enviado!")
            return res.sendStatus(401);
        }

        const userSession = await pgConnection.query("SELECT * FROM sessions WHERE token = $1", [token]);

        if (userSession.rowCount === 0) {
            console.log("token inválido!");
            return res.sendStatus(401);
        }

        res.locals.token = token;
        res.locals.userId = userSession.rows[0].userId;
        next();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}