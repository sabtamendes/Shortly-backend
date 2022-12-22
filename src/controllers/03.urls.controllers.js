import { nanoid } from "nanoid";
import { deleteById, insertUrls, selectUrlById, updateUrls } from "../repositories/03.urls.repositories.js";

export async function postUrlShorten(req, res) {
    const userId = res.locals.userId;
    const url = res.locals.url;
    console.log(url, "URL")
    try {
        const shortUrl = nanoid(10);
        const createdAt = new Date();

        await insertUrls(url, shortUrl, userId, createdAt);

        res.status(201).send({ shortUrl: shortUrl });

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}


export async function getShortenUrls(req, res) {

    const { id } = res.locals.shortUrl;

    try {

        const shortUrl = await selectUrlById(id);

        res.status(200).send(
            {
                id: shortUrl.rows[0].id,
                shortUrl: shortUrl.rows[0].shortUrl,
                url: shortUrl.rows[0].url
            });

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function redirectGetUrl(req, res) {
    const { url, id } = res.locals.url;
console.log(res.locals.url, "LOG")
    try {

        await updateUrls(id);

        res.redirect(url);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    const { id } = res.locals.shortUrl;

    try {

        await deleteById(id);

        res.sendStatus(204);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}