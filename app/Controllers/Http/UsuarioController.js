'use strict'

const Database = use ('Database')
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

    async delete ({ request, response }) {
        const usuario = await Usuario.findOrFail(request.params.id)

        await usuario.delete()

        return "Usuario Deletado"

     /*    await Database
            .table('usuarios')
            .where({ id: request.params.id} )
            .delete()
        return response.json({ delete: "Usuario Deletado" }) */
    }

    /* async infectados ({ request }) {
        const usuario = await Usuario.all()

        console.log(usuario.)

        return usuario
    } */
}

module.exports = UsuarioController
