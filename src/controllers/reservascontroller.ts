import { Reservas, ReservaJson } from '../models/reservas';
import { Request, Response, NextFunction } from 'express';
import { RerservaService } from '../apis/services/reservaservices';

//melhorar validacoes nos metodos
export class ReservasController {

    async index(req: Request, res: Response) {
        try {
            const reservaservice = new RerservaService();
            const results = await reservaservice.index()
            return res.json(results)
        } catch (err) {
            return res.status(401).json("Ocorreu algum erro!")
        }
    }

    async indexJoinReservasUser(req: Request, res: Response) {
        const id_usuario = req.params.id_usuario
        const id_espaco = req.query.id_espaco
        const tipofiltro = req.query.tipofiltro as string
        try {
            const reservaservice = new RerservaService();
            const results = await reservaservice.indexJoinEspacoUser(Number(id_usuario), Number(id_espaco), tipofiltro)
            return res.json(results)
        } catch (err) {
            return res.status(400).json("Ocorreu algum erro!")
        }
    }

    async verificandoHorariosIndisponiveisEspaco(req: Request, res: Response) {
        const idespaco = req.params.id_espaco
        try {
            const reservaservice = new RerservaService()
            const results = await reservaservice.verificaHorariosIndisponiveisPorReserva(Number(idespaco))
            return res.json(results)
        } catch (err) {
            return res.status(400).json("Ocorreu algum erro!")
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const body = req.body as ReservaJson
        console.log(body)
        const reservaservice = new RerservaService();
        const respostas = await reservaservice.create(body)
        return res.status(respostas.status).json({ "resposta": respostas.resposta })
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const reservaservice = new RerservaService();
        var respostas = await reservaservice.delete(id)
        return res.status(respostas.status).json(respostas.resposta)
    }

}



