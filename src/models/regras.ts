import { Criptografia } from '../utils/criptografia/criptografia';
import knex from '../database/index'

export class Regras {
    id: BigInt;
    arquivo: string;

    async InsertRegras(regras: Regras): Promise<boolean> {
        try {
            await knex('regras').insert(
                regras
            )
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async SelectRegras(): Promise<Regras[]> {
        try {
            const user = await knex('regras') as Regras[]
            return user;
        } catch (err) {
            console.log(err)
        }
    }

    async RetornaRegrasPorId(id: string): Promise<Regras> {
        try {
            const regra = await knex('regras').where({ id: id }) as Regras[]
            return regra[0];
        } catch (err) {
            console.log(err)
        }
    }

    async UpdateRegras(arquivo: String, id: number): Promise<boolean> {
        try {
            await knex('regras').update({ arquivo }).where({ id })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async DeleteRegras(id: number): Promise<boolean> {
        try {
            await knex('regras').where({ id }).del()
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}