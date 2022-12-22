import pgConnection from "../database/database.js";

export function selectUsersByUserId(userId) {
    return pgConnection.query(`SELECT * FROM users WHERE id = $1;`, [userId]);
}

export function countAllUrlVisits(id) {
    return pgConnection.query(`SELECT SUM(urls."urlVisits")::INTEGER FROM urls WHERE urls."userId" = $1;`, [id]);
}

export function countEachUrlVisits(id) {
    return pgConnection.query(`SELECT
            urls.id, urls."shortUrl", urls.url, 
            SUM(urls."urlVisits")::INTEGER AS "visitCount"
            FROM urls
            WHERE urls."userId" = $1
            GROUP BY urls.id;`, [id]);
}