import knex from '../database/index'

export class Espaco {
    id: BigInt;
    nameespaco: string;
    fotoespaco: string;
    descricaoespaco: string;

    async InsertEspaco(espaco: Espaco): Promise<boolean> {
        console.log(espaco)
        try {
            await knex('espacos').insert(
                espaco
            )
            return true
        } catch (err) {
            return false
        }
    }

    async SelectEspaco(): Promise<Espaco[]> {
        try {
            const espacos = await knex('espacos') as Espaco[]
            return espacos;
        } catch (err) {
            console.log(err)
        }
    }

    async UpdateEspaco(nameespaco: String, fotoespaco: String, descricaoespaco: String, id: number): Promise<boolean> {
        try {
            await knex('espacos').update({ nameespaco, fotoespaco, descricaoespaco }).where({ id })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async DeleteEspaco(id: number): Promise<boolean> {
        try {
            await knex('espacos').where({ id }).del()
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

}