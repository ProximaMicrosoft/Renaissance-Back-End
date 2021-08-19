import knex from '../database/index'

export class AuxiliarSenha {
    id: number;
    token_senha: string;
    ativo: boolean;
    usuario_id: number;

    constructor(token_senha?: string, ativo?: boolean, usuario_id?: number) {
        this.token_senha = token_senha;
        this.ativo = ativo;
        this.usuario_id = usuario_id;
    }

    async InsertAuxiliarSenha(auxiliarsenha: AuxiliarSenha): Promise<boolean> {
        console.log(auxiliarsenha)
        try {
            await knex('auxiliar_senha').insert(
                auxiliarsenha
            )
            return true
        } catch (err) {
            return false
        }
    }

    async UpdateAuxiliarSenha(token_senha: String, ativo: boolean, id: number): Promise<boolean> {
        try {
            await knex('auxiliar_senha').update({ token_senha, ativo }).where({ id })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

}