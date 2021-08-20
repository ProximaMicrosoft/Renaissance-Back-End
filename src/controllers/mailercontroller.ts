import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'
import { Mailer } from '../mailer/mailer';
import { JsonWebToken } from '../utils/webtoken/jsonwebtoken';
import { AuxiliarSenha } from '../models/auxiliarsenha';

export class MailerController {

    async recuperarSenhaEmail(req: Request, res: Response, next: NextFunction) {
        if (new JsonWebToken().verificaToken(req.headers.authorization)) {
            const body = req.body as Mailer
            const user = new User()
            const email = new Mailer()
            const auxiliarsenha = new AuxiliarSenha()
            const jsonwebtoken = new JsonWebToken()
            var usuario = await user.verificandoSeEmailExiste(body.email)
            if (usuario == undefined) {
                return res.status(400).json("ocorreu algum erro!")
            } else {
                var salt = bcrypt.genSaltSync(10)
                await auxiliarsenha.UpdateAuxiliarSenha(salt, true, Number(usuario.id))
                var result = await email.enviarEmail(usuario, "www.condomiorenasceredefinirsenha/" + salt)
                if (result) {
                    return res.status(200).json({ "Sucesso !": " Email enviado com sucesso !" })
                } else {
                    return res.status(400).json("Ocorreu algum erro@")
                }
            }
        } else {
            return res.status(401).json("Você não tem autorização para esta rota !")
        }
    }
}