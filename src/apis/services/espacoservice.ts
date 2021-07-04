import { Espaco } from '../../models/espaco';
import { Respostas } from '../../models/respostas';

export class EspacoService {
    async create(espacos: Espaco): Promise<Respostas> {
        const espaco = new Espaco()
        var result = await espaco.InsertEspaco(espacos)
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

    async index(): Promise<Espaco[]> {
        const espaco = new Espaco()
        const results = await espaco.SelectEspaco()
        return results;
    }

    async delete(id: string): Promise<Respostas> {
        const espaco = new Espaco()
        const respostas = new Respostas();
        var result = await espaco.DeleteEspaco(Number(id))
        if (result) {
            respostas.status = 200
            respostas.resposta = "Espaço deletado com sucesso!"
            return respostas
        } else {
            respostas.status = 400
            respostas.resposta = "Ocorreu algum erro ao deletar o espaço"
            return respostas
        }
    }

}