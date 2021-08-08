import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('usuario', table => {
        table.text('cpf')
        table.text('datanascimento')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('usuario', table => {
        table.dropColumn('cpf')
        table.dropColumn('datanascimento')
    })
}




