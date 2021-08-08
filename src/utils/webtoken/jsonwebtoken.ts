import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

export class JsonWebToken {

    geraToken(): string {
        var token = jwt.sign({ foo: 'bar' }, process.env.CHAVE, { expiresIn: '1h' })
        return token
    }

    verificaToken(token: string): boolean {
        var variavel = false
        jwt.verify(token, process.env.CHAVE, function (err, decoded) {
            if (err) {
                variavel = false
            } else {
                variavel = true
            }
        })

        return variavel
    }
}