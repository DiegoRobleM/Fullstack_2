const LLAVE = "carrito";

let carrito =
    JSON.parse(localStorage.getItem(LLAVE)) || [];

const contenedorCarrito =
    document.getElementById("carrito");

const totalElemento =
    document.getElementById("total");


function mostrarCarrito() {

    contenedorCarrito.innerHTML = "";

    let total = 0;


    carrito.forEach(function(producto, indice) {

        const item = document.createElement("div");

        item.className = "card mb-3";

        item.innerHTML = `
            <div class="card-body d-flex align-items-center gap-4">

                <img
                    src="../Pasteleria/${producto.imagen}"
                    alt="${producto.titulo}"
                    class="imagen-carrito"
                >

                <div class="flex-grow-1">

                    <h5>
                        ${producto.titulo}
                    </h5>

                    <p>
                        Precio:
                        $${producto.precio.toLocaleString("es-CL")}
                    </p>

                </div>

                <button
                    type="button"
                    class="btn btn-outline-danger btn-eliminar"
                >
                    Eliminar
                </button>

            </div>
        `;


        const btnEliminar =
            item.querySelector(".btn-eliminar");

        btnEliminar.addEventListener("click", function() {
            eliminar(indice);
        });


        contenedorCarrito.appendChild(item);

        total = total + producto.precio;
    });


    totalElemento.textContent =
        "$" + total.toLocaleString("es-CL");
}


function eliminar(indice) {

    carrito.splice(indice, 1);

    localStorage.setItem(
        LLAVE,
        JSON.stringify(carrito)
    );

    mostrarCarrito();
}


mostrarCarrito();