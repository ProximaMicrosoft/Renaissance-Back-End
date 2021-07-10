import { Criptografia } from '../utils/criptografia/criptografia';
import knex from '../database/index'

export class User {
    id: BigInt;
    name: string;
    email: string;
    token: string;
    numerotelefone: string;
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
                email: usuario.email
            }).limit(1) as User[]
            const criptografia = new Criptografia()
            console.log(user[0])
            var senhacorreta = criptografia.VericaHashSenha(usuario.password, user[0].token, user[0].password)
            user[0].password = ""
            user[0].token = ""
            if (senhacorreta) {
                return [true, user[0]]
            } else {
                return [false, null]
            }

        } catch (err) {
            console.log(err)
            return [false, null]
        }
    }
}