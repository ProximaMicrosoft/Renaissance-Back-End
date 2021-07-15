import { Reservas, ReservaJson, ReservaJoin } from '../../models/reservas';
import { Respostas } from '../../models/respostas';
import { ValidacoesReserva } from '../../utils/validacoes/validacoesreserva';

export class RerservaService {
    async create(reservasjson: ReservaJson): Promise<Respostas> {
        const reserva = new Reservas()
        const validacaoreserva = new ValidacoesReserva()
        reserva.horario = validacaoreserva.montarData(reservasjson.data, reservasjson.horario)
        reserva.espacos_id = reservasjson.espacos_id
        reserva.usuario_id = reservasjson.usuario_id

        var result = await reserva.InsertReserva(reserva)
        const respostas = new Respostas();
        if (result) {
            respostas.status = 201
            respostas.resposta = "Cadastrado com sucesso !"
            return respostas
        } else {
            respostas.status = 400
            respostas.resposta = "Ocorreu algum erro!"
            return respostas
        }
    }

    async index(): Promise<Reservas[]> {
        const reserva = new Reservas()
        const results = await reserva.SelectReserva()
        return results;
    }

    async indexJoinEspacoUser(): Promise<ReservaJoin[]> {
        const reserva = new Reservas()
        const results = await reserva.SelectReservasJoin()
        return results;
    }

    async delete(id: string): Promise<Respostas> {
        const reserva = new Reservas()
        const respostas = new Respostas();
        var result = await reserva.DeleteReserva(Number(id))
        if (result) {
            respostas.status = 200
            respostas.resposta = "Reserva deletada com sucesso!"
            return respostas
        } else {
            respostas.status = 400
            respostas.resposta = "Ocorreu algum erro ao deletar a reserva !"
            return respostas
        }
    }

}