import { Request, Response, NextFunction } from 'express';
import knex from '../database/index'
import { User } from '../models/user';
import { UserService } from '../apis/services/userservice';


class UserController {

    async index(req: Request, res: Response) {
        const user = new User()
        const results = await user.SelectUser()
        return res.json(results)
    }
    async create(req: Request, res: Response, next: NextFunction) {
        const body = req.body as User
        const userservice = new UserService();
        var array = await userservice.create(body)
        return res.status(Number(array[0])).json(array[1])
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
        var result = await user.DeleteUser(Number(id))
        if (result) {
            return res.status(201).json("Excluído com sucesso !")
        } else {
            return res.status(401).json("Ocorreu algum erro ao excluir!")
        }
    }

}

export default UserController;


