let iconoCarrito = document.querySelector('.iconoCarrito');
let carrito = document.querySelector('.carrito');
let contenedor = document.querySelector('.contenedor');
let cerrar = document.querySelector('.cerrar');

iconoCarrito.addEventListener('click', () => {
    if (carrito.style.right == '-100%') {
        carrito.style.right = '0';
        contenedor.style.transform = 'translateX(-400px)';
    } else {
        carrito.style.right = '-100%';
        contenedor.style.transform = 'translateX(0)';
    }
})

cerrar.addEventListener('click', () => {
    carrito.style.right = '-100%';
    contenedor.style.transform = 'translateX(0)';
})

let productos = null;
// obtiene datos del archivo json
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        addDataToHTML();
    })

// muestra datos en lista en html
function addDataToHTML() {
    // remueve datos por defecto en html
    let listaProductosHTML = document.querySelector('.listaProductos');
    listaProductosHTML.innerHTML = '';

    // agrega datos nuevos
    if (productos != null) {
        productos.forEach(producto => {
            let nuevoProducto = document.createElement('div');
            nuevoProducto.classList.add('item');
            nuevoProducto.innerHTML =
                `<img src="${producto.imagen}" alt=""><h2>${producto.nombre}</h2><div class="precio">¥${producto.precio}</div><button onclick="agregarCarrito(${producto.id})">Agregar al Carro</button>`;
            listaProductosHTML.appendChild(nuevoProducto);
        });
    }
}

let listaCarrito = [];
// obtiene datos del carrito de cookies
function chequeaCarrito() {
    var valorCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('listacCarrito='));
    if (valorCookie) {
        listaCarrito = JSON.parse(valorCookie.split('=')[1]);
    }
}

chequeaCarrito();


function agregarCarrito($idProducto) {
    let productoCopia = JSON.parse(JSON.stringify(productos));
    // si este producto no esta en el carro
    if (!listaCarrito[$idProducto]) {
        let datosProducto = productoCopia.filter(
            producto => producto.id == $idProducto
        )[0];
        // agrega datos del producto al carrito
        listaCarrito[$idProducto] = datosProducto;
        listaCarrito[$idProducto].cantidad = 1;
    } else {
        // si este producto ya esta en el carrito se incrementa la cantidad
        listaCarrito[$idProducto].cantidad++;
    }
    // se guardan datos del carrito en las cookies
    let tiempoGuarddo = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie = "listaCarrito=" + JSON.stringify(listaCarrito) + "; " + tiempoGuarddo + "; path=/;";
    agregarCarritoToHTML();
}
function agregarCarritoToHTML() {
    // borrar datos por defecto
    let listaCarritoHTML = document.querySelector('.listaCarrito');
    listaCarritoHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalCantidad');
    totalCantidad = 0;

    if (listaCarrito) {
        listaCarrito.forEach(producto => {
            if (producto) {
                let nuevoCarrito = document.createElement('div');
                nuevoCarrito.classList.add('item');
                nuevoCarrito.innerHTML =
                    `<img src="${producto.imagen}" alt="">
                <div class="contenido">
                    <div class="nombre">
                        ${producto.nombre}
                    </div>
                    <div class="precio">
                        ¥${producto.precio}
                    </div>
                </div>
                <div class="cantidad">
                    <button onclick="cambiarCantidad(${producto.id}, '-')">-</button>
                    <span class="valor">${producto.cantidad}</span>
                    <button onclick="cambiarCantidad(${producto.id}, '+')">+</button>
                </div>`;
                listaCarritoHTML.appendChild(nuevoCarrito);
                totalCantidad = totalCantidad + producto.cantidad;
            }
        })
    }
    totalHTML.innerText = totalCantidad;
}

function cambiarCantidad($idProducto, $tipo){
    switch ($tipo) {
        case '+':
            listaCarrito[$idProducto].cantidad++;
            break;
        case '-':
            listaCarrito[$idProducto].cantidad--;
            if(listaCarrito[$idProducto].cantidad <= 0){
                delete listaCarrito[$idProducto];
            }
            break;
        
            default:
                break;
    }
    // se guardan datos en las cookies
    let tiempoGuarddo = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie = "listaCarrito=" + JSON.stringify(listaCarrito) + "; " + tiempoGuarddo + "; path=/;";

    // recarga la lista del carrito en HTML
    agregarCarritoToHTML();
}