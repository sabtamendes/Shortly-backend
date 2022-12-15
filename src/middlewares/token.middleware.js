import connection from "../database/db.js";

export default async function tokenMiddleware(req, res, next) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const allreadyLogged = await connection.query("SELECT token FROM ");

        if (!allreadyLogged) {
            return res.sendStatus(401);
        }

        const userExists = await users.findOne({ _id: allreadyLogged.userId });

        if (!userExists) {
            return res.sendStatus(401);
        }

    } catch (err) {
        res.sendStatus(500);
    }

    res.locals.user = token;

    next();
}