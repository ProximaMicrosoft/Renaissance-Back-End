import knex from '../database/index'

interface AuxiliarSenhaUser {
    token_senha: string;
    ativo: boolean;
    usuario_id: number;
    name: string;
    email: string;
    token: string;
    numerotelefone: string;
}

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

    async SelectAuxiliarSenhaJoin(token: string): Promise<AuxiliarSenhaUser> {
        try {
            const auxiliarsenha = await knex('auxiliar_senha').
                join('usuario', 'auxiliar_senha.usuario_id', '=', 'usuario.id').
                where('auxiliar_senha.token_senha', '=', token) as AuxiliarSenhaUser[]
            return auxiliarsenha[0]
        } catch (err) {
            console.log(err)
        }
    }

    async UpdateAuxiliarSenha(token_senha: string, ativo: boolean, usuario_id: number): Promise<boolean> {
        try {
            await knex('auxiliar_senha').update({ token_senha, ativo }).where({ usuario_id })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

}