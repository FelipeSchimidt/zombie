'use strict'
const Database = use('Database')
const Usuario = use('App/Models/Usuario')

class UsuarioController {
    async index () {
        const usuario = await Usuario.all()

        return usuario
    }
    
    async show ({ request }) {
        try {
            const usuario = await Usuario.findOrFail(request.params.id)
            return usuario
        } catch (e) {
            return 'Usuario não encontrado'
        }
    }

    async store ( { request } ) {
        const usuario = await Usuario.createMany(Object.values(request.body))

        return usuario
    }

    async update ( { request } ) {
        const usuario = await Usuario.findOrFail(request.params.id)

        usuario.merge(request.all())

        return await usuario.save()
    }

    async updatePosicao ( { request } ) {
        
        const usuario = await Usuario.findOrFail(request.params.id)

        usuario.merge(request.only(['latitude', 'longitude']))

        return await usuario.save()
    }

    async updateInfectado( { request } ) {
        const usuario = await Usuario.findOrFail(request.params.id)
        const possInfect = await Usuario.findOrFail(request.body.id_infectado)

        usuario.merge(request.only('id_infectado'))
        await usuario.save()
        
        return "Usuario "+ usuario.nome + " marcou usuario " + possInfect.nome + " como possivel infectado"
    }

    async destroy ({ request, response }) {
        const usuario = await Usuario.findOrFail(request.params.id)

        await usuario.delete()

        return "Usuario Deletado"
    }

    async relatorio () {
        var total, zombie, humano, resultado, agua, comida, remedio, municao, saude
        
        for (var valor of await Database.from('usuarios').count()){
            total = JSON.parse(Object.values(valor))
        }
        
        for (var valor of await Database.from('usuarios').sum('id_infectado')){
            zombie = JSON.parse(Object.values(valor))
            humano = total - zombie
        }

        //console.log(await Database.from('usuarios').getCountDistinct('agua'))
        //agua = await Database.from('usuarios').sum('agua').map(water => JSON.parse(Object.values(water)))
        for (var valor of await Database.from('usuarios').avg('agua')){
            agua = JSON.parse(Object.values(valor))
        }

        for (var valor of await Database.from('usuarios').avg('comida')){
            comida = JSON.parse(Object.values(valor))
        }

        for (var valor of await Database.from('usuarios').avg('remedio')){
            remedio = JSON.parse(Object.values(valor))
        }
        for (var valor of await Database.from('usuarios').avg('municao')){
            municao = JSON.parse(Object.values(valor))
        }
        resultado = {
            "infectados" : Math.round((zombie/total)*100)+'%',
            "não-infectados": Math.round((humano/total)*100)+'%',
            "inventario": {
                "agua": agua,
                "comida": comida,
                "remedio": remedio,
                "municao": municao
            }
        }
        return resultado
    }

    async addItem ({ request }) {
        const usuario = await Usuario.findOrFail(request.params.id)

        usuario.merge(request.only(['agua', 'comida', 'remedio', 'municao']))
        return usuario.save()
    }

    async deleteItem ({ request }) {
        const usuario = await Usuario.findOrFail(request.params.id)

        usuario.merge(request.only(['agua', 'comida', 'remedio', 'municao']))
        return usuario.save()
    }
}

module.exports = UsuarioController
