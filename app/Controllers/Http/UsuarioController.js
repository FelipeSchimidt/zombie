'use strict'
const Database = use('Database')
const Usuario = use('App/Models/Usuario')
const Infeccao = use('App/Models/Infeccao')

class UsuarioController {
    async index () {
        const usuario = await Usuario.all()

        return usuario.toJSON()
    }
    
    async show ({ request }) {
        try {
            const usuario = await Usuario.findOrFail(request.params.id)
            return usuario.toJSON()
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

    async destroy ({ request }) {
        const usuario = await Usuario.findOrFail(request.params.id)

        await usuario.delete()

        return "Usuario Deletado"
    }

    async updatePosicao ( { request } ) {
        
        const usuario = await Usuario.findOrFail(request.params.id)

        usuario.merge(request.only(['latitude', 'longitude']))

        return await usuario.save()
    }

    /**
     * Determinação de infecção
     * Se usuario.infeccao for maior ou igual a 3
     * considerar zombie:
     * -> Bloquear invetario
     * -> Bloquear escambo
     * @param {*} param0 
     */
    async updateInfectado( { request } ) {
        try {
            const usuario = await Usuario.findOrFail(request.params.id)

            const contaminado = parseInt(request.body.contaminado)
            const indica_id = parseInt(request.params.id)

            const infectado = new Infeccao
            infectado.indica_id = indica_id
            infectado.contaminado = contaminado

            for(var valor of await Database.from('infeccaos')){
                if (valor.id_indica === parseInt(request.params.id) 
                    && valor.contaminado ===  contaminado
                    || (indica_id == contaminado)){
                    return {"alerta":"usuario ja contaminado"}
                } else {
                    await infectado.save()
                }
            }            
        } catch (error) {
            return {"error":"Usuario não encontrado"}
        }        
        /* usuario.merge(usuario.listaInfectados)
        await usuario.save() */
        
        /* return "Usuario "+ usuario.nome + " marcou usuario " + infectado.nome + " como possivel infectado" */
    }

    async relatorio () {
        
        const usuario = await Database.from('usuarios')
        const infeccao = await Database.from('infeccaos')
        
        var total, zombie, humano, resultado, agua, comida, remedio, municao

        
        for (var valor of await Database.from('usuarios').count()){
            total = JSON.parse(Object.values(valor))
        }
        
        for (var valor of await Database.from('usuarios').where('infeccao', '>', 3).count()){
            zombie = JSON.parse(Object.values(valor))
            humano = total - zombie
        }

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
        const infecado = await Database.from('infeccaos')

        if (await Database.from('infeccaos').where('id_contaminado', '>=', 3))
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
