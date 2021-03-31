const express = require("express") //biblioteca p criar servidor
const server = express()
const routes = require("./routes")

server.set('view engine', 'ejs') //usando template engine

//habilitar arquivos estáticobs
server.use(express.static("public"))

//routes
server.use(routes)

server.listen(3000, () => console.log("inicio servidor"))

