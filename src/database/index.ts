import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})


console.log("DATABASE", process.env.DATABASE)
console.log("PASSWORD", process.env.PASSWORDBANCO)
console.log("PORT", process.env.PORT)
console.log("USUARIO", process.env.USUARIOBANCO)
console.log("Dentro do Index", process.env.DATABASE_URL)
const connection = knex({
    client: 'pg',
    connection: {
        database: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    },
    useNullAsDefault: true,
});

export default connection;

