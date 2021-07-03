import knex from '../database/index'

export class User {
    id: BigInt;
    name: string;
    email: string;
    password: string;
    numeroapartamento: number
    role: string;

    async InsertUser(usuario: User): Promise<boolean> {
        try {
            await knex('usuario').insert(
                usuario
            )
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async SelectUser(): Promise<User[]> {
        try {
            const user = await knex('usuario') as User[]
            return user;
        } catch (err) {
            console.log(err)
        }
    }

    async UpdateUser(name: String, password: String, id: number, role: String): Promise<boolean> {
        try {
            await knex('usuario').update({ name, password, role }).where({ id })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
    async DeleteUser(id: number): Promise<boolean> {
        try {
            await knex('usuario').where({ id }).del()
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async Login(usuario: User): Promise<[boolean, User]> {
        try {
            const user = await knex.select().from<User>('usuario').where({
                email: usuario.email,
                password: usuario.password
            }).limit(1) as User[]
            user[0].password = ""
            if (user[0].name != "" || user[0].name != undefined) {
                return [true, user[0]]
            } else {
                return [false, user[0]]
            }

        } catch (err) {
            console.log(err)
            return [false, null]
        }
    }
}