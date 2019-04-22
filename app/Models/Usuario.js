'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Usuario extends Model {
    infectado(){
        return this.hasOne('App/Models/Infected')
    }
    getAgua(n){
        return n * 4
    }
    getComida(n){
        return n * 3
    }
    getRemedio(n){
        return n * 2
    }
}

module.exports = Usuario
