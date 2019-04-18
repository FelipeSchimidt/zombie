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
  return { greeting: 'Hello world in JSON' }
})

Route.get('/usuarios', 'UsuarioController.index')

Route.get('/usuarios/infectados', 'UsuarioController.infectados')
Route.get('/usuarios/naoinfectados', 'UsuarioController.naoinfectados')
Route.get('/usuarios/inventario', 'UsuarioController.inventario')

Route.get('/usuarios/:id', 'UsuarioController.show')

Route.post('/usuarios', 'UsuarioController.store')

Route.put('/usuarios/:id', 'UsuarioController.update')

Route.put('/usuarios/localizacao/:id', 'UsuarioController.updatePosicao')

Route.delete('/usuarios/:id', 'UsuarioController.delete')
/* Route.post('/usuarios', async () =>{
  return await Database.table('usuarios').select('*') //{ usuarios: 'Lista de Usuarios' }
}) */
