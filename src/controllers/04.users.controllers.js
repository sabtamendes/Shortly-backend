import pgConnection from "../database/database.js";

export async function getUser(req, res) {
    const user = res.locals.user;
    const token = res.locals.token;

    try {

        const users = await pgConnection.query(`
        SELECT * FROM users;`);

        const count = await pgConnection.query(`SELECT COUNT(visits.id) FROM visits;`);

        const urls = await pgConnection.query(`SELECT
            urls.id, urls."shortUrl", urls.url, 
            COUNT(visits.visit) AS "visitCount"
            FROM urls
            JOIN visits
            ON urls.id = visits."urlId"
            GROUP BY urls.id;
        `);

        res.status(200).send(
            {
                id: users.rows[0].id,
                name: users.rows[0].name,
                visitCount: count.rows[0].count,
                shortenedUrl: urls.rows
            }
        );

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}