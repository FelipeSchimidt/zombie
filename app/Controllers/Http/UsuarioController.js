'use strict'
const Database = use('Database')
const Usuario = use('App/Models/Usuario')
const Infectado = use('App/Models/Infected')

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
        usuario.merge(request.only('id_infectado'))
        await usuario.save()


        const infectado = new Infectado()
        infectado.id_usuario = request.params.id
        infectado.id_infectado = request.only('id_infectado')
        await infectado.save()
        
        return "Usuario "+ usuario.nome + " marcou usuario " + usuario.id_infectado + " como infectado"
    }

    async indexInfecteds () {
        const infectados = await Infectado.all()
        return infectados
    }

    async destroy ({ request, response }) {
        const usuario = await Usuario.findOrFail(request.params.id)

        await usuario.delete()

        return "Usuario Deletado"
    }

    async relatorio () {
        var total, zombie, humano, resultado, agua, comida, remedio, municao
    
        for (var valor of await Database.from('usuarios').count()){
            total = JSON.parse(Object.values(valor))
        }
        
        for (var valor of await Database.from('usuarios').sum('infectado')){
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
/*         console.log(Math.round((zombie/total)*100))
        console.log(Math.round((humano/total)*100))
 */
        //console.log(typeof infectado)
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

        if (usuario.infectado === 0){
            usuario.merge(request.only(['agua', 'comida', 'remedio', 'municao']))
            return usuario.save()
        } else {
            return "usuario infectado"
        }
    }

    async deleteItem ({ request }) {
        const usuario = await Usuario.findOrFail(request.params.id)

        if (usuario.infectado === 0){
            usuario.merge(request.only(['agua', 'comida', 'remedio', 'municao']))
            return usuario.save()
        } else {
            return "usuario infectado"
        }
    }

    async trocarItens({ request }){
        var user1       = await Usuario.findBy("id", request.body.usuario1)
        var user2       = await Usuario.findBy("id", request.body.usuario2)
        
        console.log(user1.toJSON())
        return user1
    }
    /* async infectados ({ request }) {
        const usuario = await Usuario.all()

        console.log(usuario.)

        return usuario
    } */
    
}

module.exports = UsuarioController
