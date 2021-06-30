import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('usuario', table => {
        table.increments('id')
        table.text('name').notNullable()
        table.text('email').unique().notNullable()
        table.text('password').notNullable()
        table.integer('numeroapartamento').unique().notNullable()
        table.text('role').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('usuario');
}

