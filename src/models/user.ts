import knex from '../database/index'

export class User {
    id: BigInt;
    name: string;
    email: string;
    password: string;

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

    async UpdateUser(name:String,passord:String,id:number):Promise<boolean> {
        try {
            await knex('administrador').update({name, passord}).where({id})
            return true
        } catch (err) {
            return true
        }
    }
}