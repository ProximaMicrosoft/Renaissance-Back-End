import { LibFs } from '../../utils/libfs/libfs';
import { Regras } from '../../models/regras';
import { Respostas } from '../../models/respostas';


export class RegrasService {
    async create(regras: Regras): Promise<Respostas> {
        const regra = new Regras()
        var result = await regra.InsertRegras(regras)
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

    async index(): Promise<Regras[]> {
        const regras = new Regras()
        const results = await regras.SelectRegras()
        return results;
    }

    async delete(id: string): Promise<Respostas> {
        const regras = new Regras()
        var regraspesquisada = new Regras()
        const libfs = new LibFs()
        const respostas = new Respostas()
        regraspesquisada = await regras.RetornaRegrasPorId(id)
        var result = await regras.DeleteRegras(Number(id))
        if (result) {
            await libfs.apagaArquivo(regraspesquisada.arquivo)
            respostas.status = 200
            respostas.resposta = "Regra deletada com sucesso!"
            return respostas
        } else {
            respostas.status = 400
            respostas.resposta = "Ocorreu algum erro ao deletar a regra"
            return respostas
        }
    }

}