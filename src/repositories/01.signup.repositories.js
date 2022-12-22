import pgConnection from "../database/database.js";

export function selectUserByEmail(email) {
    return pgConnection.query(`SELECT email FROM users WHERE email = $1;`, [email]);
}

export function insertUsers(name, email, passwordHash) {
    return pgConnection.query(`INSERT INTO users (name, email,password) VALUES ($1, $2, $3);`, [name, email, passwordHash]);
}