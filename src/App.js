const express = require('express');
const {Server} = require('socket.io');
const handlebars = require('express-handlebars');
const productsRoute = require('./routes/products.routes');
const cardsRoute = require ('./routes/carts.routes')
const viewRoute = require('./routes/views.route')
const {connectionSocket} = require('./utils/soket.io')
const server = express();

const httpServer = server.listen(8080, ()=> {
    console.log('Servidor escuchando en puerto 8080')
})

//handlerbars
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');
//express
server.use(express.static(__dirname+'/public'));
server.use(express.json())
server.use(express.urlencoded({extended:true}))
//rutas

server.use("/api/products/", productsRoute);
server.use("/api/carts/", cardsRoute);
server.use("/", viewRoute);

connectionSocket (httpServer);