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

export interface DiasHorariosIndiponiveis {
    horario: string
    horariosindiponveis: number[]
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

    async SelectReservasJoin(id_usuario: number, id_espaco: number, tipofiltro: string): Promise<ReservaJoinResponse[]> {
        var filtros;
        const dataretorna = new DataRetorna()
        const validacaoreserva = new ValidacoesReserva()
        var [datainicial, datafinal] = dataretorna.retornaDataHoje()

        if (isNaN(id_usuario) == false && id_usuario != 0) {
            filtros = { 'usuario.id': id_usuario }
        }
        if (isNaN(id_espaco) == false && id_espaco != 0) {
            filtros = { 'usuario.id': id_usuario, 'espacos_id': id_espaco }
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
                    select('reservas.id', 'reservas.horario', 'espacos.nameespaco', 'usuario.name').orderBy('reservas.horario') as ReservaJoin[]

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



    async VerificandoHorariosIndisponiveisPorEspaco(id: number): Promise<Reservas[]> {
        const dataretorna = new DataRetorna()
        var [datainicial, datafinal] = dataretorna.retornaDataHoje()
        try {
            const espacos = await knex('reservas').where({ espacos_id: id }).
                where('reservas.horario', '>=', datainicial).orderBy('reservas.horario', 'asc') as Reservas[]

            console.log(await knex('reservas').where({ espacos_id: id }).
                where('reservas.horario', '>=', datainicial).orderBy('reservas.horario', 'asc').toString())
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


    async VerificaQuantidadeReservaPorData(data: string, espaco: string, idespaco: Number): Promise<[number, Error]> {
        const validacaoreserva = new ValidacoesReserva()
        const dataretorna = new DataRetorna()
        var [horarioseparado, datanormal] = validacaoreserva.desmontaData(new Date(data))
        var [datainicial, datafinal] = dataretorna.recebeDataRetornaDataInicialEFinal(datanormal)


        if (espaco == "DECK" || espaco == "SALAO DE FESTA") { //pq nesse caso é o dia todo
            try {
                const reservas = await knex('reservas').whereBetween('reservas.horario', [datainicial, datafinal]).
                    where({ espacos_id: idespaco }) as Reservas[]
                return [reservas.length, null]
            } catch (err) {
                return [0, new Error("nenhuma reserva encontrada !")]
            }

        } else {
            try {
                const reservas = await knex('reservas').where({ horario: data, espacos_id: idespaco }) as Reservas[]
                return [reservas.length, null]
            } catch (err) {
                return [0, new Error("nenhuma reserva encontrada !")]
            }
        }

    }


}