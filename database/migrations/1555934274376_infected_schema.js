'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InfectedSchema extends Schema {
  async up () {
    const exists = await this.hasTable('infecteds')
    if (!exists) {
      this.create('infecteds', (table) => {
        table.increments()
        table.integer('id_usuario')
        table.integer('id_infectado')
          .comment('Informar o id do usuario que pode estar infectado')
          .notNullable()
          .unsigned()
          .defaultTo(0)
          .references('id')
          .inTable('usuarios')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
        table.timestamp('created_at', 3)
        table.timestamp('updated_at', 3)
      })
    }
  }

  down () {
    this.dropIfExists('infecteds')
  }
}

module.exports = InfectedSchema
