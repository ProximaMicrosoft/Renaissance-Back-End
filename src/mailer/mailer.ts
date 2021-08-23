import { User } from '../models/user';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})



var remetente = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    html: "",
    auth: {
        user: 'renaissanceappcondominio@gmail.com',
        pass: process.env.SENHAEMAIL
    }
});




export class Mailer {
    email: string

    async enviarEmail(usuario: User, link: string) {
        var emailASerEnviado = {
            html: `<p>Oi ${usuario.name}</p><br><p>Por favor, se deseja redefinir sua senha clique neste link para prosseguir
            <a href='${link}'>${link}</a>` + `</p>
            </h1>`,
            from: 'renaissanceappcondominio@gmail.com',
            to: usuario.email,
            subject: 'Esqueceu a senha ?',
            text: 'Atualize sua senha clicando neste link : ' + link,
        };

        var valor = await remetente.sendMail(emailASerEnviado);
        return valor;

    }
}