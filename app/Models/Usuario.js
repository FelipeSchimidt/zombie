'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Usuario extends Model {
    getListaInfectados(lista){
        return JSON.stringify(lista)
    }

    setInfeccao(id){
        return id <= 3 ? id + 1 : id
    }

    infeccaos(){
        return this.hasMany('App/models/Infeccao', 'id', 'id_indica')
    }
}

module.exports = Usuario
