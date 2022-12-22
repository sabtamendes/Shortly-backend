import pgConnection from "../database/database.js";

export function selectSessionByToken(token){
return pgConnection.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
}