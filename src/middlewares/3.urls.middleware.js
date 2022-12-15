import { isValidUrl } from '../schemas/url.schemas.js';

export async function urlsValid(req, res, next) {
    const { authorization } = req.headers;
    const { url } = req.body;
    try {
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    const urlValidation = isValidUrl(url);

    if (urlValidation === false || !urlValidation) {
        return res.sendStatus(422);
    }

    res.locals.url = url;

    next();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}