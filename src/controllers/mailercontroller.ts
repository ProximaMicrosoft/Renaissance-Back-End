import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { Mailer } from '../models/mailer';
import { JsonWebToken } from '../utils/webtoken/jsonwebtoken';
import { AuxiliarSenha } from '../models/auxiliarsenha';

export class MailerController {
    async recuperarSenhaEmail(req: Request, res: Response, next: NextFunction) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            const body = req.body as Mailer
            const user = new User()
            const auxiliarsenha = new AuxiliarSenha()
            var usuario = await user.verificandoSeEmailExiste(body.email)
            if (usuario.name == "" || usuario.name == null) {
                return res.status(400).json("email não cadastrado na base!")
            } else {

            }
        }
    }
}