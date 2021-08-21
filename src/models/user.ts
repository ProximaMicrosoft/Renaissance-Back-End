import { Criptografia } from '../utils/criptografia/criptografia';
import knex from '../database/index'

export class User {
    id: BigInt;
    name: string;
    email: string;
    token: string;
    numerotelefone: string;
    password: string;
    cpf: string;
    datanascimento: string;
    numeroapartamento: string;
    role: string;

    async InsertUser(usuario: User): Promise<[boolean, number]> {
        try {
            var id = await knex('usuario').returning('id').insert(
                usuario
            )

            return [true, id[0]]
        } catch (err) {
            console.log(err)
            return [false, 0]
        }
    }
    async verificandoSeEmailExiste(email: string): Promise<User> {
        try {
            const user = await knex('usuario').where({ email }) as User[]
            return user[0];
        } catch (err) {
            console.log(err)
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

    async UpdateUser(name: String, id: number, role: String, numerotelefone: String, cpf: String, datanascimento: String): Promise<boolean> {
        try {
            await knex('usuario').update({ name, role, numerotelefone, cpf, datanascimento }).where({ id })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async UpdatePassword(password: string, token: string, id: number): Promise<boolean> {
        try {
            await knex('usuario').update({ password, token }).where({ id })
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