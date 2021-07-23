import { ValidacoesReserva } from '../utils/validacoes/validacoesreserva';
import knex from '../database/index'
import { DataRetorna } from '../utils/funcoesutils/data'

export interface ReservaJoin {
    id: number;
    horario: string;
    nameespaco: string;
    fotoespaco: string;
    descricaoespaco: string;
    espacos_id: number;
    usuario_id: number;
    name: string;
    email: string;
}

export interface ReservaJoinResponse {
    id: number;
    data: string;
    horario: number;
    nameespaco: string;
    fotoespaco: string;
    descricaoespaco: string;
    espacos_id: number;
    usuario_id: number;
    name: string;
    email: string;
}

export interface ReservaJson {
    id: number;
    data: string;
    horario: number;
    espacos_id: number;
    usuario_id: number;
}

export class Reservas {
    id: number;
    horario: string;
    espacos_id: number;
    usuario_id: number;

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

    async SelectReservasJoin(id: number, espaco: number, tipofiltro: string): Promise<ReservaJoinResponse[]> {
        var filtros;
        const dataretorna = new DataRetorna()
        const validacaoreserva = new ValidacoesReserva()
        var [datainicial, datafinal] = dataretorna.retornaDataHoje()

        if (isNaN(id) == false && id != 0) {
            filtros = { 'usuario.id': id }
        }
        if (isNaN(espaco) == false && espaco != 0) {
            filtros = { 'usuario.id': id, 'espacos_id': espaco }
        }

        try {
            if (tipofiltro == "day") {
                const espacos = await knex('reservas').
                    join('usuario', 'reservas.usuario_id', '=', 'usuario.id').
                    join('espacos', 'reservas.espacos_id', '=', 'espacos.id').
                    where(filtros).whereBetween('reservas.horario', [datainicial, datafinal]).
                    select().orderBy('reservas.horario') as ReservaJoin[]
                return validacaoreserva.passandoReservaJoinParaReservaJson(espacos);

            } else {
                const espacos = await knex('reservas').
                    join('usuario', 'reservas.usuario_id', '=', 'usuario.id').
                    join('espacos', 'reservas.espacos_id', '=', 'espacos.id').
                    where(filtros).where('reservas.horario', '>=', datainicial).
                    select('reservas.id', 'reservas.horario', 'espacos.nameespaco').orderBy('reservas.horario') as ReservaJoin[]

                return validacaoreserva.passandoReservaJoinParaReservaJson(espacos);

            }
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


    async VerificaQuantidadeReservaPorData(data: string): Promise<[number, Error]> {
        try {
            const reservas = await knex('reservas').where({ horario: data }) as Reservas[]
            return [reservas.length, null]
        } catch (err) {
            return [0, new Error("nenhuma reserva encontrada !")]
        }
    }


}