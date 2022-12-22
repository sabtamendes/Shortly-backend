import { selectAllLinks } from "../repositories/05.ranking.repositories.js";

export async function getRanking(req, res) {

    try {
        const allLinks = await selectAllLinks();

        res.status(200).send(allLinks.rows);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}