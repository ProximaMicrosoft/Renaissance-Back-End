import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('espacos', table => {
        table.increments('id')
        table.text('nameespaco').notNullable()
        table.text('descricaoespaco').notNullable()
        table.text('fotoespaco').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('espacos');
}

