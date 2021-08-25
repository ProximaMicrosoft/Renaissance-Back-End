import { Espaco } from '../../models/espaco';
import { Reservas, ReservaJson, ReservaJoinResponse, DiasHorariosIndiponiveis } from '../../models/reservas';
import { Respostas } from '../../models/respostas';
import { ValidacoesReserva } from '../../utils/validacoes/validacoesreserva';

export class RerservaService {
    async create(reservasjson: ReservaJson): Promise<Respostas> {
        const reserva = new Reservas()
        const espaco = new Espaco(reservasjson.espacos_id)
        const espacoid = await espaco.SelectEspacoporId(espaco)
        const respostas = new Respostas()
        const validacaoreserva = new ValidacoesReserva()
        //melhorar validaco reserva pois nao esta retornando qual é o erro realmente
        var [message, error] = validacaoreserva.verificaHorario(espacoid.nameespaco, reservasjson.horario)
        if (error != null) {
            respostas.status = 400
            respostas.resposta = message
            return respostas
        }
        var verificandoregradequantidade = await validacaoreserva.verificaSeQuantidadeDeRegistroUltrapassaUnidadeTempo(espacoid.nameespaco, reservasjson.data, reservasjson.horario, reservasjson.espacos_id)
        if (verificandoregradequantidade) {
            respostas.status = 400
            respostas.resposta = "Você tentou cadastrar um reserva, porém o limite para esse horário foi excedido"
            return respostas
        }
        else {
            reserva.horario = validacaoreserva.montarData(reservasjson.data, reservasjson.horario)
            reserva.espacos_id = reservasjson.espacos_id
            reserva.usuario_id = reservasjson.usuario_id

            var result = await reserva.InsertReserva(reserva)
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

    }

    async index(): Promise<Reservas[]> {
        const reserva = new Reservas()
        const results = await reserva.SelectReserva()
        return results;
    }

    async verificaHorariosIndisponiveisPorReserva(idespaco: number): Promise<DiasHorariosIndiponiveis[]> {
        const reserva = new Reservas()
        const espaco = new Espaco()
        const validacaoreserva = new ValidacoesReserva()
        const objectespaco = await espaco.RetornaNomeEspacoPorId(idespaco)
        const results = await reserva.VerificandoHorariosIndisponiveisPorEspaco(idespaco)
        const objetohorarioindisponiveis = validacaoreserva.montaObjetoDiasHorariosIndiponiveis(results)
        const indisponiveisrealmente = validacaoreserva.verificandoRealmenteSeHorarioEstaIndiponivel(objetohorarioindisponiveis, objectespaco.nameespaco, idespaco)
        return indisponiveisrealmente;
    }

    async indexJoinEspacoUser(id_usuario: number, id_espaco: number, tipofiltro: string): Promise<ReservaJoinResponse[]> {
        const reserva = new Reservas()
        const results = await reserva.SelectReservasJoin(id_usuario, id_espaco, tipofiltro)
        return results;
    }

    async indexJoinReservaAdmin(id_usuario: number, id_espaco: number, data_inicial: string, data_final: string): Promise<ReservaJoinResponse[]> {
        const reserva = new Reservas()
        const results = await reserva.SelectReservasJoinModoAdmin(id_usuario, id_espaco, data_inicial, data_final)
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