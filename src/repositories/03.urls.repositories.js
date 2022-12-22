import pgConnection from "../database/database.js";

export function insertUrls(url, shortUrl, userId, createdAt) {
    return pgConnection.query(`
        INSERT INTO urls (url, "shortUrl", "userId", "createdAt") 
        VALUES ($1, $2, $3, $4);`,
        [url, shortUrl, userId, createdAt]
    );
}

export function selectUrlById(id) {
    return pgConnection.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
}

export function selectByShortUrl(shortUrl) {
    return pgConnection.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
}

export function updateUrls(id) {
    return pgConnection.query(`UPDATE urls SET "urlVisits" = "urlVisits" + 1 WHERE id = $1;`, [id]);
}

export function selectUrlsByUserIdAndUrlId(userId, id) {
    return pgConnection.query(`SELECT * FROM urls WHERE "userId" = $1 AND id = $2;`, [userId, id]);
}

export function deleteById(id) {
    return pgConnection.query(`DELETE FROM urls WHERE id = $1;`, [id]);
}
