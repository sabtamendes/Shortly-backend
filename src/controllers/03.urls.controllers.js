import { nanoid } from "nanoid";
import pgConnection from "../database/database.js";

export async function postUrlShorten(req, res) {
    const userId = res.locals.userId;
    const url = res.locals.url;
    console.log(url, "URL")
    try {
        const shortUrl = nanoid(10);
        const createdAt = new Date();

        await pgConnection.query(`INSERT INTO 
        urls (url, "shortUrl", "userId", "createdAt") 
        VALUES ($1, $2, $3, $4);`,
            [url, shortUrl, userId, createdAt]
        );

        res.status(201).send({ shortUrl: shortUrl });

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

// export async function getShortenUrls(req, res) {
//     const shortUrl = res.locals.shortUrl;

//     try {
//         res.status(200).send(shortUrl);

//     } catch (error) {
//         console.error(error);
//         res.sendStatus(500);
//     }
// }

export async function getShortenUrls(req, res) {

    const { id } = res.locals.shortUrl;

    try {

        const shortUrl = await pgConnection.query('SELECT id, "shortUrl", url FROM urls WHERE id = $1;', [id]);

        res.status(200).send(shortUrl.rows[0]);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function redirectGetUrl(req, res) {
    const { url, id } = res.locals.url;
console.log(res.locals.url, "LOG")
    try {

        await pgConnection.query(`UPDATE urls SET "urlVisits" = "urlVisits" + 1 WHERE id = $1;`,[id]);

        res.redirect(url);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    const { id } = res.locals.shortUrl;

    try {

        await pgConnection.query("DELETE FROM urls WHERE id = $1;", [id]);

        res.sendStatus(204);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}