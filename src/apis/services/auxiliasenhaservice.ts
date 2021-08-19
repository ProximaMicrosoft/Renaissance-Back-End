import { AuxiliarSenha } from "../../models/auxiliarsenha";
import { Respostas } from '../../models/respostas';

export class AuxiliarSenhaService {
    async create(auxilio: AuxiliarSenha): Promise<Respostas> {
        const auxiliarsenha = new AuxiliarSenha()
        var result = await auxiliarsenha.InsertAuxiliarSenha(auxilio)
        const respostas = new Respostas();
        if (result) {
            respostas.status = 201
            respostas.resposta = "Cadastrado com sucesso !"
            return respostas
        } else {
            respostas.status = 400
            respostas.resposta = "Ocorreu algum erro!"
            return respostas
        }
    }

}