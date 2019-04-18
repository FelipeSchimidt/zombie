'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.increments().primary('id').unique()
      table.string('nome', 80).notNullable().unique()
      table.integer('idade').notNullable()
      table.string('sexo', 1).notNullable()
      table.boolean('infectado')
      table.decimal('latitude', 8, 3).notNullable()
      table.decimal('longitude', 8, 3).notNullable()
      table.integer('agua').defaultTo(0)
      table.integer('comida').defaultTo(0)
      table.integer('medicamento').defaultTo(0)
      table.integer('municao').defaultTo(0)
      table.timestamp('created_at', 3)
      table.timestamp('updated_at', 3)
    })
  }

  down () {
    this.dropIfExists('usuarios')
  }
}

module.exports = UsuarioSchema
