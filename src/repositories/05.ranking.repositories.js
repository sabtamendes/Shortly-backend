import pgConnection from "../database/database.js";

export function selectAllLinks() {
    return pgConnection.query(`
             SELECT users.id, users.name, 
             COUNT(urls.id)::INTEGER AS "linksCount", 
             COALESCE(SUM(urls."urlVisits"),0)::INTEGER AS "visitCount"
             FROM users
             LEFT JOIN urls ON users.id = urls."userId" 
             GROUP BY users.id
             ORDER BY "visitCount" DESC, "linksCount" DESC
             LIMIT 10
           ;`);
}