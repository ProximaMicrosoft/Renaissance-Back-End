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

var emailASerEnviado = {
    from: 'renaissanceappcondominio@gmail.com',
    to: 'antonioguilhermeinfo@gmail.com',
    subject: 'Enviando Email com Node.js',
    text: 'Estou te enviando este email com node.js',
};



export class Mailer {
    enviarEmail() {
        remetente.sendMail(emailASerEnviado, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado com sucesso.');
            }
        });

    }
}