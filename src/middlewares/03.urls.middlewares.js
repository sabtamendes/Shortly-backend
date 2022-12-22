import pgConnection from "../database/database.js";
import { selectByShortUrl, selectUrlById, selectUrlsByUserIdAndUrlId } from "../repositories/03.urls.repositories.js";
import { urlSchema } from "../schemas/03.urls.schemas.js";

export async function urlValidation(req, res, next) {
    const { url } = req.body;

    const { error } = urlSchema.validate({ url }, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {

        res.locals.url = url;
        next();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

// export async function shortenValidation(req, res, next) {
//     const { id } = req.params;

//     if (isNaN(Number(id))) {
//         return res.status(404).send("id inválido");
//     }

//     try {

//         const shortUrl = await pgConnection.query('SELECT id, "shortUrl", url FROM urls WHERE id = $1;', [id]);

//         if (shortUrl.rowCount === 0) {
//             return res.sendStatus(404);
//         }

//         res.locals.shortUrl = shortUrl.rows[0];
//         next();

//     } catch (error) {
//         console.error(error);
//         res.sendStatus(500);
//     }
// };

export async function shortenValidation(req, res, next) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(404).send("id inválido");
    }

    try {

        const shortUrl = await selectUrlById(id);

        if (shortUrl.rowCount === 0) {
            console.log("shortUrl não existe");
            return res.sendStatus(404);
        }

        res.locals.shortUrl = shortUrl.rows[0];
        next();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function redirectUrlValidation(req, res, next) {
    const { shortUrl } = req.params;

    try {

        const shortUrlExist = await selectByShortUrl(shortUrl);

        if (shortUrlExist.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.locals.url = shortUrlExist.rows[0];
        
        next();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function urlBelongsToUserValidation(req, res, next) {
    const userId = res.locals.userId; //id do usuário middlweares tokenValidation
    const { id } = res.locals.shortUrl;
    console.log(userId, "userId")
    try {

        const userUrl = await selectUrlsByUserIdAndUrlId(userId, id);

        //se a url não pertecer ao usuário
        if (userUrl.rowCount === 0) {
            console.log("url não pertence ao usuário");
            return res.sendStatus(401);
        }

        next();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}