import pgConnection from "../database/database.js";

export function selectByEmail(email) {
    return pgConnection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

export function insertSessions(token, id){
   return pgConnection.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2);`, [token, id]);
}