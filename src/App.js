const express = require('express');
const { Server } = require('socket.io');
const server = express();
const handlebars = require('express-handlebars');
const routerViews = require('./routes/views.routes');
const productsRoute = require('./routes/products.routes');
const cardsRoute = require ('./routes/carts.routes');
const productsRouteBD   = require ('./routes/products.routeBD');
const { default: mongoose } = require('mongoose');
mongoose.set("strictQuery", false)

const httpServer = server.listen(8080, ()=> {
    console.log('Servidor escuchando en puerto 8080')
})

const io = new Server(httpServer);
const msgs= [];

io.on('connection', (socket) => {
    socket.on('new-user', (data) => {
        socket.broadcast.emit('new-user', {user: data.user});
    });
    console.log('nuevo usuario conectado');
    socket.broadcast.emit('new-user', {
        user: 'Gonzalo',
    })
    socket.emit('history', msgs);
    socket.on('message', (data) => {
    //   console.log(data);
      msgs.push(data);
      io.emit('message', data);
    });
});

//Conexión con Mongo Atlas Database
mongoose.connect ('mongodb+srv://gonzafredes1:I64q7oebbHQfu1qc@pruebabackend.7gddxpl.mongodb.net/test',
(error) => {
    if (error) {
        console.log("Error de conexión con base de Mongo Atlas", error);
        proccess.exit ()
    } else {
        console.log("Se ah conectado correctamente a la base de Mongo Atlas");
    }
});

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
server.use("/api/productsBD/", productsRouteBD);


server.use ('/', routerViews);

