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
        user: 'bhicqbqifyrbqc',
        password: '1adb70d4d3655fbcf1606c87d614dfbc821f98b5dc4dca995964836cc2c14556',
        port: 5432,
        host: 'ec2-50-17-255-120.compute-1.amazonaws.com',
        database: 'dtjmv8aoeie9r',
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
