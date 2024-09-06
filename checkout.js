let listaCarrito = [];
// obtiene datos del carrito de las cookies

function chequeaCarrito() {
    var valorCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('listaCarrito='));
    if (valorCookie) {
        listaCarrito = JSON.parse(valorCookie.split('=')[1])
    }
}
chequeaCarrito();
agregarCarritoToHTML();
function agregarCarritoToHTML() {
    // limpia los datos del html
    let listaCarritoHTML = document.querySelector('.retornarCarrito .lista');
    listaCarritoHTML.innerHTML = '';
    let cantidadTotalHTML = document.querySelector('.cantidadTotal');
    let precioTotalHTML = document.querySelector('.precioTotal');

    let cantidadTotal = 0;
    let precioTotal = 0;

    // si el producto esta en el carro
    if (listaCarrito) {
        listaCarrito.forEach(producto => {
            if (producto) {
                let nuevoProducto = document.createElement('div');
                nuevoProducto.classList.add('item');
                nuevoProducto.innerHTML =
                    `<img src="${producto.imagen}" alt="">
                        <div class="info">
                            <div class="nombre">${producto.nombre}</div>
                            <div class="price">¥${producto.precio}</div>
                        </div>
                        <div class="cantidad">${producto.cantidad}</div>
                        <div class="precioRetorno">¥${producto.precio * producto.cantidad}</div>`;
                listaCarritoHTML.appendChild(nuevoProducto);
                cantidadTotal = cantidadTotal + producto.cantidad;
                precioTotal = precioTotal + (producto.precio * producto.cantidad);
            }
        })
    }
    cantidadTotalHTML.innerText = cantidadTotal;
    precioTotalHTML.innerText = '¥' + precioTotal;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkoutForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío tradicional del formulario

        const formData = new FormData(form);

        try {
            // simula la respuesta del servidor
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // simula una respuesta exitosa
                    resolve();
                    // simula un error
                    // reject(new Error('Simulated server error'));
                }, 1000); // Simula un tiempo de espera de 1 segundo
            });

            // muestra una alerta de exito
            Swal.fire({
                title: 'Success!',
                text: 'Your purchase has been confirmed.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '/'; // Redirigir a la página principal o a otra página
            });

        } catch (error) {
            // muestra una alerta de error
            Swal.fire({
                title: 'Error!',
                text: `There was an issue with your purchase: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
});
