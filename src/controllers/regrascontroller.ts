import { Request, Response, NextFunction } from 'express';
import { Regras } from '../models/regras';
import { RegrasService } from '../apis/services/regraservice';

//melhorar validacoes nos metodos
export class RegrasController {

    async index(req: Request, res: Response) {
        try {
            const regrasservice = new RegrasService();
            const results = await regrasservice.index()
            return res.json(results)
        } catch (err) {
            return res.status(401).json("Ocorreu algum erro!")
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const body = req.body as Regras
        const regrasservice = new RegrasService()
        body.arquivo = req.file.filename
        const respostas = await regrasservice.create(body)
        return res.status(respostas.status).json(respostas.resposta)
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const regrasservice = new RegrasService();
        var respostas = await regrasservice.delete(id)
        return res.status(respostas.status).json(respostas.resposta)
    }



}



