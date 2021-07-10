import bcrypt from 'bcrypt'
import { SaltSenha } from '../../models/SaltSenha';



export class Criptografia {

    gerarSalt(senha: string): SaltSenha {
        var salt = bcrypt.genSaltSync(10)
        var senhaParaSalvar = bcrypt.hashSync(senha, salt)
        const criptografiaagora = new SaltSenha(salt, senhaParaSalvar)
        return criptografiaagora
    }

    VericaHashSenha(senhadigitadapelousuario: string, salt: string, senhabanco: string) {
        if (bcrypt.hashSync(senhadigitadapelousuario, salt) === senhabanco) {
            return true
        } else {
            return false
        }
    }


}