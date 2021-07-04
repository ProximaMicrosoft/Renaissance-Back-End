import knex from '../database/index'

export class Reservas {
    id: BigInt;
    horario: Date;
    espacos_id: BigInt;
    usuario_id: BigInt;

    async InsertReserva(reserva: Reservas): Promise<boolean> {
        console.log(reserva)
        try {
            await knex('reservas').insert(
                reserva
            )
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async SelectReserva(): Promise<Reservas[]> {
        try {
            const espacos = await knex('reservas') as Reservas[]
            return espacos;
        } catch (err) {
            console.log(err)
        }
    }


    async DeleteReserva(id: number): Promise<boolean> {
        try {
            await knex('reservas').where({ id }).del()
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}