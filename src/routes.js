const express = require('express') //biblioteca pra criar servidor
const routes = express.Router() //parte do express que cria as rotas/caminhos
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardConroller = require('./controllers/DashboardConroller')

//req., res //dirname vai atras dos diretorios
routes.get('/', DashboardConroller.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes