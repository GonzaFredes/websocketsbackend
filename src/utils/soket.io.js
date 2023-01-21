const ProductManager = require("../ProductManager");
const Product = new ProductManager('./assets/product.json');
const {Server} = require('socket.io');
let io;

const connectionSocket = (httpServer)=>{
    io = new Server(httpServer);
    io.on ('connection', async (socket)=>{
        console.log("Nuevo Clinte conectado")
        let products = await Product.getProducts();
        
        socket.emit('init.productos', products)
    });
}

const emitDeleteProduct = (id)=>{
    io.emit('delete.productos', {id})
}

const emitaddRealtime = (add)=>{
    io.emit('create.productos',{add} )
}

module.exports = {
    connectionSocket,
    emitDeleteProduct,
    emitaddRealtime
};
