'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const Database = use('Database')

Route.get('/', () => {
  return { 
    API: 'API ZOMBIE', 
    DEVELOPER: 'Felipe Santos', 
    EMAIL: 'felipeschimidt85@gmail.com'
  }
})

Route.group(() => {
  Route.resource('usuarios', 'UsuarioController').apiOnly()

  Route.get('relatorio', 'UsuarioController.relatorio')

  Route.put(':id/infectado', 'UsuarioController.updateInfectado')
  
  Route.post(':id/items', 'UsuarioController.addItem')

  Route.delete(':id/items', 'UsuarioController.deleteItem')

  Route.put('/usuarios/localizacao/:id', 'UsuarioController.updatePosicao')
})
