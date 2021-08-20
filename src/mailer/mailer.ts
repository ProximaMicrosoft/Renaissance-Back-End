import { User } from '../models/user';
import nodemailer from 'nodemailer'


var remetente = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'renaissanceappcondominio@gmail.com',
        pass: ''
    }
});




export class Mailer {
    email: string

    async enviarEmail(usuario: User, link: string) {
        var emailASerEnviado = {
            from: 'renaissanceappcondominio@gmail.com',
            to: usuario.email,
            subject: 'Esqueceu a senha ?',
            text: 'Atualize sua senha clicando neste link : ' + link,
        };

        var valor = await remetente.sendMail(emailASerEnviado);
        return valor;

    }
}