import { AuxiliarSenha } from '../models/auxiliarsenha';
import { Request, Response, NextFunction } from 'express';
import { JsonWebToken } from '../utils/webtoken/jsonwebtoken';
import { AuxiliarSenhaService } from '../apis/services/auxiliasenhaservice';

export class AuxiliarSenhaController {

    async create(req: Request, res: Response, next: NextFunction) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            const body = req.body as AuxiliarSenha
            const espacoservice = new AuxiliarSenhaService;
            const respostas = await espacoservice.create(body)
            return res.status(respostas.status).json(respostas.resposta)
        } else {
            return res.status(401).json("Você não tem permissão para esta rota !")
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            const body = req.body as AuxiliarSenha
            const id = req.params.id
            try {
                const auxiliar = new AuxiliarSenha()
                var result = await auxiliar.UpdateAuxiliarSenha(body.token_senha, body.ativo, Number(id))
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


}