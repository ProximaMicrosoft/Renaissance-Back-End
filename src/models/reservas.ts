import knex from '../database/index'

export interface ReservaJoin {
    id: BigInt;
    horario: string;
    nameespaco: string;
    fotoespaco: string;
    descricaoespaco: string;
    espacos_id: BigInt;
    usuario_id: BigInt;
    name: string;
    email: string;
}

export interface ReservaJson {
    id: BigInt;
    data: string;
    horario: number;
    espacos_id: BigInt;
    usuario_id: BigInt;
}

export class Reservas {
    id: BigInt;
    horario: string;
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

    async SelectReservasJoin(): Promise<ReservaJoin[]> {
        try {
            const espacos = await knex('reservas').
                join('usuario', 'reservas.usuario_id', '=', 'usuario.id').
                join('espacos', 'reservas.espacos_id', '=', 'espacos.id') as ReservaJoin[]
            return espacos;
        } catch (err) {
            console.log(err)
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