import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

console.log("DATABASE", process.env.DATABASE)
console.log("PASSWORD", process.env.PASSWORDBANCO)
console.log("PORT", process.env.PORT)
console.log("USUARIO", process.env.USUARIOBANCO)
console.log("Dentro do Index", process.env.DATABASE_URL)
module.exports = {
    client: 'pg',
    connection: {
        user: 'vvitlmjxnugrql',
        password: '43a9101a09943c7570db31525c32c6734153a3fb889c23f24ba53850bf6c2a41',
        port: 5432,
        host: 'ec2-35-170-85-206.compute-1.amazonaws.com',
        database: 'dbs6hgcoo975eu',
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
