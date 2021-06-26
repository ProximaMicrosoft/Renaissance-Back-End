import knex from '../database/index'

export class Espaco {
    id: BigInt;
    nomespaco: string;
    fotoespaco: string;
    descricaoespaco: string;

    async InsertAdministador(administador: Espaco): Promise<boolean> {
        try {
            await knex('espaco').insert(
                administador
            )
            return true
        } catch (err) {
            return false
        }
    }
}