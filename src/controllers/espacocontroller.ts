import { Request, Response, NextFunction } from 'express';
import { Espaco } from '../models/espaco';
import { EspacoService } from '../apis/services/espacoservice';
import { JsonWebToken } from '../utils/webtoken/jsonwebtoken';

//melhorar validacoes nos metodos
export class EspacoController {

    async index(req: Request, res: Response) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            try {
                const espacoservice = new EspacoService();
                const results = await espacoservice.index()
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
            const body = req.body as Espaco
            console.log(body)
            body.fotoespaco = req.file.filename
            const espacoservice = new EspacoService();
            const respostas = await espacoservice.create(body)
            return res.status(respostas.status).json(respostas.resposta)
        } else {
            return res.status(401).json("Você não tem permissão para esta rota !")
        }

    }

    async update(req: Request, res: Response, next: NextFunction) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            const body = req.body as Espaco
            const id = req.params.id
            try {
                const espaco = new Espaco()
                var result = await espaco.UpdateEspaco(body.nameespaco,
                    body.fotoespaco, body.descricaoespaco, Number(id))
                if (result) {
                    return res.status(201).json("Alterado com sucesso !")
                } else {
                    return res.status(401).json("Ocorreu algum erro ao alterar!")
                }
            }
            catch (err) {
                next(err)
            }
        } else {
            return res.status(401).json("Você não tem permissão para esta rota !")
        }

    }

    async delete(req: Request, res: Response, next: NextFunction) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            const id = req.params.id
            const espacoservice = new EspacoService();
            var respostas = await espacoservice.delete(id)
            return res.status(respostas.status).json(respostas.resposta)
        } else {
            return res.status(401).json("Você não tem permissão para esta rota !")
        }
    }
}



