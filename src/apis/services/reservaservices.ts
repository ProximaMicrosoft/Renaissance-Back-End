import { Reservas } from '../../models/reservas';
import { Respostas } from '../../models/respostas';

export class RerservaService {
    async create(reservas: Reservas): Promise<Respostas> {
        const reserva = new Reservas()
        var result = await reserva.InsertReserva(reservas)
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