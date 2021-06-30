import { User } from '../../models/user';

export class ValidacaoUser {

    ValidaUsuario(usuario: User): boolean {
        if (usuario.name != ""
            && (this.VerificaSenha(usuario.password))
            && (this.VerificaRole(usuario.role))
        ) {
            return true
        } else {
            return false
        }
    }

    VerificaSenha(password: String): boolean {
        if ((password.length > 6) && (password != "")) {
            return true
        } else {
            return false
        }

    }

    VerificaRole(role: String): boolean {
        if (role == "ADMIN" || role == "USER") {
            return true
        } else {
            return false
        }

    }
}