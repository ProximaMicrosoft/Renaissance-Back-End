import knex from '../database/index'

export class Reservas {
    id: BigInt;
    horario: Date;
    espaco_id: BigInt;
    user_id: BigInt;

    async InsertAdministador(administador: Reservas): Promise<boolean> {
        try {
            await knex('reservas').insert(
                administador
            )
            return true
        } catch (err) {
            return false
        }
    }
}