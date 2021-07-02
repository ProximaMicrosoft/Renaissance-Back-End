import { Request, Response, NextFunction } from 'express';
import knex from '../database/index'
import { User } from '../models/user';
import { UserService } from '../apis/services/userservice';


class UserController {

    async index(req: Request, res: Response) {
        try {
            const userservice = new UserService();
            const results = await userservice.index()
            return res.json(results)
        } catch (err) {
            return res.status(401).json("Ocorreu algum erro!")
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
        const body = req.body as User
        const userservice = new UserService();
        const respostas = await userservice.create(body)
        return res.status(respostas.status).json(respostas.resposta)
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const body = req.body as User
        const id = req.params.id
        try {
            const user = new User()
            var result = await user.UpdateUser(body.name, body.password, Number(id), body.role)
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
        const user = new User()
        const userservice = new UserService();
        var respostas = await userservice.delete(id)
        return res.status(respostas.status).json(respostas.resposta)
    }

}

export default UserController;


