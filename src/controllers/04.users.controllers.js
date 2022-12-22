import pgConnection from "../database/database.js";

export async function getUser(req, res) {
    const user = res.locals.user;
    console.log(user, "DADOS DO USUÁRIO ATRELADO AO TOKEN")
    try {

        const users = await pgConnection.query(`SELECT * FROM users WHERE id = $1;`, [user.id]);

        
        const count = await pgConnection.query(`SELECT SUM(urls."urlVisits")::INTEGER FROM urls WHERE urls."userId" = $1;`, [user.id]);

       
        const urls = await pgConnection.query(`SELECT
            urls.id, urls."shortUrl", urls.url, 
            SUM(urls."urlVisits")::INTEGER AS "visitCount"
            FROM urls
            WHERE urls."userId" = $1
            GROUP BY urls.id;`, [user.id]);

            

        res.status(200).send(
            {
                id: users.rows[0].id,
                name: users.rows[0].name,
                visitCount: count.rows[0].sum > 0 ? count.rows[0].sum : 0,
                shortenedUrls: urls.rows.length === 0 ? 0 : urls.rows  
            }
        );

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}