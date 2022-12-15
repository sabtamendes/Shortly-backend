import { nanoid } from 'nanoid';
import connection from "../database/database.js";

export async function postUrls(req, res) {
    const { url } = res.locals.url;

    try {
        const shortUrl = url + nanoid(10);

        await connection.query('INSERT INTO urls (url, "shortUrl") VALUES ($1, $2);', [url, shortUrl]);

        res.send({ shortUrl: shortUrl }).status(201);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getUrlsById(req, res) {
    const { id } = req.params;

    try {

        const shortUrl = await connection.query('SELECT * FROM urls WHERE id = $1;'[id]);

        if (shortUrl[0].rows.length === 0) {
            return res.sendStatus(404);
        }

        res.send(shortUrl.rows).status(200);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getUrlsOPenShortUrl(req, res) {
    const {shortUrl} = req.query;

    try {
        const urlShorted = await connection.query('SELECT "shortUrl" FROM urls WHERE "shortUrl" = $1;'[shortUrl]);

        if (urlShorted[0].rows.length === 0) {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
