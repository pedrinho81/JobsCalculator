const express = require('express') //biblioteca pra criar servidor
const routes = express.Router() //parte do express que cria as rotas/caminhos

const views = __dirname + "/views/" //caminho base//Usamos a const view pq o ejs le apenas o ../maratonas

const profile = {
    name: "Pedrinho", 
    avatar: "https://avatars.githubusercontent.com/u/79291250?s=400&u=f4dadbf7e4c7be5a4fab0c0778d76b76fc66a288&v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

//req., res //dirname vai atras dos diretorios
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))


module.exports = routes