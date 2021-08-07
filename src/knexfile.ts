import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

console.log("AAAA " + process.env.DATABASE)

module.exports = {
    client: 'pg',
    connection: {
        user: process.env.USUARIOBANCO,
        password: process.env.PASSWORDBANCO,
        port: process.env.PORTA,
        host: process.env.HOST,
        database: process.env.DATABASE,
        ssl: { rejectUnauthorized: false }

    },
    migrations: {
        directory: `database/migrations`
    },
    seeds: {
        directory: `database/seeds`
    },

    useNullAsDefault: true,
}
