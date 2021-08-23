import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto'
import { Mailer } from '../mailer/mailer';
import { AuxiliarSenha } from '../models/auxiliarsenha';
import { Criptografia } from '../utils/criptografia/criptografia';

interface SenhaInterface {
    senha: string
}

export class MailerController {

    async recuperarSenhaEmail(req: Request, res: Response, next: NextFunction) {
        const body = req.body as Mailer
        const user = new User()
        const email = new Mailer()
        const auxiliarsenha = new AuxiliarSenha()
        var usuario = await user.verificandoSeEmailExiste(body.email)
        if (usuario == undefined) {
            return res.status(400).json("ocorreu algum erro!")
        } else {
            var salt = crypto.randomBytes(20).toString('hex');
            await auxiliarsenha.UpdateAuxiliarSenha(salt, true, Number(usuario.id))
            var result = await email.enviarEmail(usuario, 'https://renaissance-iota.vercel.app/forgot-password/' + salt)
            if (result) {
                return res.status(200).json({ "Sucesso !": " Email enviado com sucesso !" })
            } else {
                return res.status(400).json("Ocorreu algum erro !")
            }
        }

    }
    async mudaSenhaAtravesToken(req: Request, res: Response, next: NextFunction) {
        const token = req.params.token
        const body = req.body as SenhaInterface
        const user = new User()
        const criptografia = new Criptografia()
        const auxiliar_senha = new AuxiliarSenha()
        const result = await auxiliar_senha.SelectAuxiliarSenhaJoin(token)
        //regra do token ativo
        if (result.ativo) {
            if (result != undefined || result.name != "") {
                const cripto = criptografia.gerarSalt(body.senha)
                user.token = cripto.salt
                user.password = cripto.senhaprasalvar
                await user.UpdatePassword(user.password, user.token, result.usuario_id)
                await auxiliar_senha.UpdateAuxiliarSenha(null, false, result.usuario_id)
                return res.status(200).json("Senha alterada com sucesso !")
            } else {
                return res.status(400).json("Ocorreu algum erro !")
            }
        } else {
            return res.status(400).json("Ocorreu algum erro !")
        }

    }
}