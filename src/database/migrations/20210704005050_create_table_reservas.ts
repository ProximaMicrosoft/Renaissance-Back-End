import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reservas', table => {
        table.increments('id')
        table.dateTime('horario').unique().notNullable()
        table.integer('espacos_id').notNullable()
        table.integer('usuario_id').notNullable()
        table.foreign('espacos_id').references('id').inTable('espacos');
        table.foreign('usuario_id').references('id').inTable('usuario');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('reservas');
}

