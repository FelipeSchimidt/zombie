'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  async up () {
    const exists = await this.hasTable('usuarios')
    if (!exists) {
      this.create('usuarios', (table) => {
        table.increments().primary('id').unique()
        table.string('nome', 80).notNullable().unique()
        table.integer('idade').notNullable()
        table.string('sexo', 1).notNullable()
        table.boolean('infectado').defaultTo(false)
        table.decimal('latitude', 8, 3).notNullable().defaultTo(0)
        table.decimal('longitude', 8, 3).notNullable().defaultTo(0)
        table.integer('agua').unsigned().defaultTo(0)
        table.integer('comida').unsigned().defaultTo(0)
        table.integer('remedio').unsigned().defaultTo(0)
        table.integer('municao').unsigned().defaultTo(0)
        table.timestamp('created_at', 3)
        table.timestamp('updated_at', 3)
      })
    }
  }

  down () {
    this.dropIfExists('usuarios')
  }
}

module.exports = UsuarioSchema
