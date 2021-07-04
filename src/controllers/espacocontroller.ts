import { Request, Response, NextFunction } from 'express';
import { Espaco } from '../models/espaco';
import { EspacoService } from '../apis/services/espacoservice';

//melhorar validacoes nos metodos
export class EspacoController {

    async index(req: Request, res: Response) {
        try {
            const espacoservice = new EspacoService();
            const results = await espacoservice.index()
            return res.json(results)
        } catch (err) {
            return res.status(401).json("Ocorreu algum erro!")
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
        const body = req.body as Espaco
        console.log(body)
        body.fotoespaco = req.file.filename
        const espacoservice = new EspacoService();
        const respostas = await espacoservice.create(body)
        return res.status(respostas.status).json(respostas.resposta)
    }

    async update(req: Request, res: Response, next: NextFunction) {
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
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const espacoservice = new EspacoService();
        var respostas = await espacoservice.delete(id)
        return res.status(respostas.status).json(respostas.resposta)
    }


}



