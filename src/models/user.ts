import knex from '../database/index'

export class User {
    id: BigInt;
    name: string;
    email: string;
    password: string;

    async InsertUser(administador: User): Promise<boolean> {
        try {
            await knex('administrador').insert(
                administador
            )
            return true
        } catch (err) {
            return false
        }
    }

    async SelectUser(): Promise<User[]> {
        try {
            const user = await knex('user') as User[]
            return user;
        } catch (err) {
        }
    }
}