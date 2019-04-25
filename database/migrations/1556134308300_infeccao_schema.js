'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InfeccaoSchema extends Schema {
  up () {
    this.create('infeccaos', (table) => {
      table.increments()
      table.integer('indica_id')
        .unsigned()
        .notNullable()
      table.integer('contaminado')
        .unsigned()
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('infeccaos')
  }
}

module.exports = InfeccaoSchema
