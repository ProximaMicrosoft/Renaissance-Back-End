import { User } from '../../models/user';
import { Respostas } from '../../models/respostas';
import { ValidacaoUser } from '../../utils/validacoes/validacoesuser';
import { Criptografia } from '../../utils/criptografia/criptografia';

export class UserService {
    async create(user: User): Promise<Respostas> {
        const usuario = new User()
        const validacaoUser = new ValidacaoUser()
        const criptografia = new Criptografia()
        const respostas = new Respostas();
        var resultvalidacao = validacaoUser.ValidaUsuario(user)
        if (resultvalidacao) {
            const cripto = criptografia.gerarSalt(user.password)
            user.token = cripto.salt
            user.password = cripto.senhaprasalvar
            var result = await usuario.InsertUser(user)
            if (result) {
                respostas.status = 201
                respostas.resposta = "Cadastrado com sucesso !"
                return respostas
            } else {
                respostas.status = 400
                respostas.resposta = "Ocorreu algum erro!"
                return respostas
            }
        } else {
            respostas.status = 400
            respostas.resposta = "Parâmetros incorretos !"
            return respostas
        }
    }
    async index(): Promise<User[]> {
        const usuario = new User()
        const results = await usuario.SelectUser()
        return results;
    }

    async delete(id: string): Promise<Respostas> {
        const user = new User()
        const respostas = new Respostas();
        var result = await user.DeleteUser(Number(id))
        if (result) {
            respostas.status = 200
            respostas.resposta = "Usuário deletado com sucesso!"
            return respostas
        } else {
            respostas.status = 400
            respostas.resposta = "Ocorreu algum erro ao deletar o usuário"
            return respostas
        }
    }

    async login(user: User): Promise<[Respostas, User]> {
        const usuario = new User()
        const respostas = new Respostas();
        const [result, userlogado] = await usuario.Login(user)
        console.log("results" + result)
        if (result) {
            respostas.status = 200
            respostas.resposta = "Sucesso !"
            return [respostas, userlogado]
        } else {
            respostas.status = 401
            respostas.resposta = "Usuário não autorizado!"
            return [respostas, userlogado]
        }

    }

}