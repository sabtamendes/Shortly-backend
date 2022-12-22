import { countAllUrlVisits, countEachUrlVisits, selectUsersByUserId } from "../repositories/04.users.repositories.js";

export async function getUser(req, res) {
    const user = res.locals.user;

    try {

        const users = await selectUsersByUserId(user.id);

        const count = await countAllUrlVisits(user.id);

        const urls = await countEachUrlVisits(user.id);

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