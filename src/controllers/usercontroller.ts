import { Request, Response, NextFunction } from 'express';
import knex from '../database/index'
import { User } from '../models/user';


class UserController {

    async index(req: Request, res: Response) {
        const user = new User()
        const results = await user.SelectUser()
        return res.json(results)
    }
    async create(req: Request, res: Response, next: NextFunction) {
        const body = req.body as User
        const user = new User()
        var result = await user.InsertUser(body)
        if (result) {
            return res.status(201).json("Cadastrado com sucesso !")
        } else {
            return res.status(401).json("Ocorreu algum erro!")
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body
        const { id } = req.params
        try {
            await knex('administrador').update({ username, password }).where({ id })
            return res.send()
        }
        catch (err) {
            next(err)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            await knex('administrador').where({ id }).del()
            return res.send();
        }
        catch (err) {
            next(err);
        }
    }

}

export default UserController;


