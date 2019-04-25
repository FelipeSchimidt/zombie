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
  
  Route.get('/usuarios', 'UsuarioController.index')  
  Route.get('/usuarios/:id', 'UsuarioController.show')  
  Route.post('/usuarios', 'UsuarioController.store')  
  Route.put('/usuarios/:id', 'UsuarioController.update')  
  Route.delete('/usuarios/:id', 'UsuarioController.destroy')

  Route.put('/usuarios/:id/infectado', 'UsuarioController.updateInfectado')  
  Route.post('/usuarios/:id/items', 'UsuarioController.addItem')
  Route.delete('/usuarios/:id/items', 'UsuarioController.deleteItem')
  Route.put('/usuarios/:id/localizacao', 'UsuarioController.updatePosicao')

  Route.get('/relatorio', 'UsuarioController.relatorio')
})
