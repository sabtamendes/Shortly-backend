import { nanoid } from "nanoid";
import pgConnection from "../database/database.js";

export async function postUrlShorten(req, res) {
    const userId = res.locals.userId;
    const url = res.locals.url;

    try {
        const shortUrl = nanoid(10);

        await pgConnection.query(`INSERT INTO 
        urls (url, "shortUrl", "userId") 
        VALUES ($1, $2, $3);`,
            [url, shortUrl, userId]
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
    //teste
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
    const url = res.locals.url;
    const urlId = res.locals.id;
    try {

        await pgConnection.query(`INSERT INTO visits ("urlId", visit) VALUES ($1, $2);`, [urlId, 1]);

        res.redirect(url);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    const { id } = res.locals.shortUrl;

    try {
        await pgConnection.query('DELETE FROM visits WHERE "urlId" = $1;', [id]);
        await pgConnection.query("DELETE FROM urls WHERE id = $1;", [id]);

        res.sendStatus(204);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}