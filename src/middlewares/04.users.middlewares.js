import pgConnection from "../database/database.js";

export async function usersValidation(req, res, next) {
    const userId = res.locals.userId;

    try {

        const userExist = await pgConnection.query(`SELECT * FROM users WHERE id = $1;`, [userId]);

        if (userExist.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.locals.user = userExist.rows[0];
        next();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}