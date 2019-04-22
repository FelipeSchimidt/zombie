'use strict'

const Infectado = use('App/Models/Infected')
const Usuario = use('App/Models/Usuario')

class InfectadoController {
    async index(){
        const infected = await Infectado.all()

        return infected
    }

    async update({ request }){
        const infected = await Infectado.all()
    }
}

module.exports = InfectadoController
