import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { UserService } from '../apis/services/userservice';
import { ValidacaoUser } from '../utils/validacoes/validacoesuser';
import { JsonWebToken } from '../utils/webtoken/jsonwebtoken';

//melhorar validacoes nos metodos
export class UserController {

    async index(req: Request, res: Response) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            try {
                const userservice = new UserService();
                const results = await userservice.index()
                return res.json(results)
            } catch (err) {
                return res.status(400).json("Ocorreu algum erro!")
            }
        } else {
            return res.status(401).json("Você não tem permissão para esta rota !")
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const body = req.body as User
        const userservice = new UserService();
        const respostas = await userservice.create(body)
        return res.status(respostas.status).json(respostas.resposta)
    }

    async update(req: Request, res: Response, next: NextFunction) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            const body = req.body as User
            const id = req.params.id
            try {
                const user = new User()
                var result = await user.UpdateUser(body.name, body.password, Number(id), body.role,
                    body.numerotelefone, body.cpf, body.datanascimento)
                if (result) {
                    return res.status(201).json("Alterado com sucesso !")
                } else {
                    return res.status(400).json("Ocorreu algum erro ao alterar!")
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
            const userservice = new UserService();
            var respostas = await userservice.delete(id)
            return res.status(respostas.status).json(respostas.resposta)
        } else {
            return res.status(401).json("Você não tem permissão para esta rota !")
        }

    }

    async login(req: Request, res: Response, next: NextFunction) {
        const body = req.body as User
        const userservice = new UserService();
        const validacaoUser = new ValidacaoUser();
        if (validacaoUser.VerificaSenha(body.password) == false || validacaoUser.VerificaEmail(body.email) == false) {
            return res.status(400).json("Senha ou email inválidos")
        } else {
            const [respostas, user] = await userservice.login(body)
            return res.status(respostas.status).json({ "resposta": respostas.resposta, "user": user })
        }
    }

}



