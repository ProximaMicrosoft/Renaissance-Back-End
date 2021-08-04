import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})


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
