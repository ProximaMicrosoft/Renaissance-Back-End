import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('auxiliar_senha', table => {
        table.increments('id')
        table.text('token_senha')
        table.boolean('ativo').notNullable()
        table.integer('usuario_id').notNullable()
        table.foreign('usuario_id').references('id').inTable('usuario');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('auxiliar_senha');
}

