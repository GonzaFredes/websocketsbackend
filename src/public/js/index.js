const socket = io();

socket.on("init.productos", (products) => {
    const rowProducts = document.getElementById("rowProducts");
    rowProducts.innerHTML = " ";
    products.forEach(element => {
        rowProducts.innerHTML += `<div class="card col-3 m-2 border border-4 id="${element.id}"">
        <img src="" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title text-center">${element.title}}</h5>
            <p class="card-text text-center">${element.description}</p>
            <h3 class="card-text text-center ">${element.price}</h3>
            <p class="card-text text-center ">cantidad:${element.stock}</p>
            <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary">Agregar</button>
            </div>
        </div>
        </div>`
    });
});

socket.on("delete.productos", (id) => {
    const product = document.getElementById(id);
    product.remove();
});

socket.on("create.productos", (element) => {
    const rowProducts = document.getElementById("rowProducts");
    rowProducts.innerHTML = `<div class="card col-3 m-2 border border-4 id="${element.id}"">
        <img src="" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title text-center">${element.title}}</h5>
            <p class="card-text text-center">${element.description}</p>
            <h3 class="card-text text-center ">${element.price}</h3>
            <p class="card-text text-center ">cantidad:${element.stock}</p>
            <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary">Agregar</button>
            </div>
        </div>
        </div>`
});