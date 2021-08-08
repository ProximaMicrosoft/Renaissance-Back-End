import { User } from '../../models/user';

export class ValidacaoUser {

    ValidaUsuario(usuario: User): boolean {
        if (usuario.name != ""
            && (this.VerificaSenha(usuario.password))
            && (this.VerificaRole(usuario.role)
                && (this.VerificaTelefone(usuario.numerotelefone))
            )
        ) {
            return true
        } else {
            return false
        }
    }

    VerificaSenha(password: String): boolean {
        try {
            if ((password.length > 6) && (password != "")) {
                return true
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    }
    VerificaEmail(email: String): boolean {
        try {
            if (email != "") {
                return true
            } else {
                return false
            }
        } catch (err) {
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

    VerificaTelefone(telefone: String): boolean {
        console.log(telefone)
        if (telefone.length == 11) {
            return true
        } else {
            return false
        }

    }
}