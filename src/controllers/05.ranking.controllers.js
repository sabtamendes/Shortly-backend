import pgConnection from "../database/database.js";

export async function getRanking(req, res) {

    try {
        const allLinks = await pgConnection.query(`
        SELECT us.id, us.name, COUNT(ur.id) AS "linksCount", COALESCE(COUNT(visits.visit),0) AS "visitCount"
        FROM users AS us
        LEFT JOIN urls AS ur ON us.id = ur."userId" 
        LEFT JOIN visits ON ur.id = visits."urlId"
        GROUP BY us.id
        ORDER BY "visitCount" DESC, "linksCount" DESC
        LIMIT 10
        ;`);

        res.status(200).send(allLinks.rows);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}