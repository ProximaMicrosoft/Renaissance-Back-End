import { response, Response } from 'express';
import { User } from '../../models/user';
import { ValidacaoUser } from '../../utils/validacoes/validacoesuser';

export class UserService {
    async create(user: User): Promise<String[]> {
        const usuario = new User()
        const validacaoUser = new ValidacaoUser();
        var resultvalidacao = validacaoUser.ValidaUsuario(user)
        if (resultvalidacao) {
            var result = await usuario.InsertUser(user)
            if (result) {
                return ["201", "Cadastrado com sucesso !"]
            } else {
                return ["401", "Ocorreu algum erro!"]
            }
        } else {
            return ["401", "Parâmetros incorretos !"]
        }
    }
}