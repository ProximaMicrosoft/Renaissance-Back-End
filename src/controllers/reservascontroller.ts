import { Reservas, ReservaJson } from '../models/reservas';
import { Request, Response, NextFunction } from 'express';
import { RerservaService } from '../apis/services/reservaservices';
import { JsonWebToken } from '../utils/webtoken/jsonwebtoken';

//melhorar validacoes nos metodos
export class ReservasController {

    async index(req: Request, res: Response) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            try {
                const reservaservice = new RerservaService();
                const results = await reservaservice.index()
                return res.json(results)
            } catch (err) {
                return res.status(401).json("Ocorreu algum erro!")
            }

        } else {
            return res.status(401).json("Você não tem permissão para esta rota !")
        }

    }

    async indexJoinReservasUser(req: Request, res: Response) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
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
        } else {
            return res.status(401).json("Você não tem permissão para esta rota !")
        }

    }

    async indexReservasModoAdmin(req: Request, res: Response) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            const id_usuario = req.body.id_usuario as string
            const id_espaco = req.body.id_espaco as string
            const data_inicial = req.body.data_inicial as string
            const data_final = req.body.data_final as string
            try {
                const reservaservice = new RerservaService();
                const results = await reservaservice.indexJoinReservaAdmin(Number(id_usuario), Number(id_espaco), data_inicial, data_final)
                return res.json(results)
            } catch (err) {
                return res.status(400).json("Ocorreu algum erro!")
            }
        } else {
            return res.status(401).json("Você não tem permissão para esta rota !")
        }
    }


    async verificandoHorariosIndisponiveisEspaco(req: Request, res: Response) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            const idespaco = req.params.id_espaco
            try {
                const reservaservice = new RerservaService()
                const results = await reservaservice.verificaHorariosIndisponiveisPorReserva(Number(idespaco))
                return res.json(results)
            } catch (err) {
                return res.status(400).json("Ocorreu algum erro!")
            }
        } else {
            return res.status(401).json("Você não tem permissão para esta rota !")
        }

    }

    async create(req: Request, res: Response, next: NextFunction) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            const body = req.body as ReservaJson
            console.log(body)
            const reservaservice = new RerservaService();
            const respostas = await reservaservice.create(body)
            return res.status(respostas.status).json({ "resposta": respostas.resposta })
        } else {
            return res.status(401).json("Você não tem permissão para esta rota !")
        }

    }

    async delete(req: Request, res: Response, next: NextFunction) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            const id = req.params.id
            const reservaservice = new RerservaService();
            var respostas = await reservaservice.delete(id)
            return res.status(respostas.status).json(respostas.resposta)
        } else {
            return res.status(401).json("Você não tem permissão para esta rota !")
        }
    }

}



