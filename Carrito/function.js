const LLAVE = "carrito";

let carrito = JSON.parse(localStorage.getItem(LLAVE)) || [];

const contenedorCarrito = document.getElementById("carrito");

const totalElemento = document.getElementById("total");

const botonVaciar = document.getElementById("btn-vaciar");

function mostrarCarrito() {
  contenedorCarrito.innerHTML = "";
  
  if (carrito.length === 0) {
    botonVaciar.classList.add("d-none");
  } else {
    botonVaciar.classList.remove("d-none");
  }

  let total = 0;

  carrito.forEach(function (producto, indice) {
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

                <div class="d-flex align-items-center gap-2">

                    <button
                        type="button"
                        class="btn btn-outline-secondary btn-restar"
                    >
                        -
                    </button>

                    <span>
                        ${producto.cantidad}
                    </span>

                    <button
                        type="button"
                        class="btn btn-outline-secondary btn-sumar"
                    >
                        +
                    </button>

                </div>

                <p class="mt-2">
                    Subtotal:
                    $${(producto.precio * producto.cantidad).toLocaleString("es-CL")}
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

    const btnEliminar = item.querySelector(".btn-eliminar");

    const btnSumar = item.querySelector(".btn-sumar");

    const btnRestar = item.querySelector(".btn-restar");

    btnEliminar.addEventListener("click", function () {
      eliminar(indice);
    });

    btnSumar.addEventListener("click", function () {
      aumentarCantidad(indice);
    });

    btnRestar.addEventListener("click", function () {
      disminuirCantidad(indice);
    });
    contenedorCarrito.appendChild(item);

    total = total + producto.precio * producto.cantidad;
  });

  totalElemento.textContent = "$" + total.toLocaleString("es-CL");
}

function eliminar(indice) {
  carrito.splice(indice, 1);

  guardarCarrito();

  mostrarCarrito();
}

function aumentarCantidad(indice) {
  carrito[indice].cantidad++;

  guardarCarrito();

  mostrarCarrito();
}

function disminuirCantidad(indice) {
  if (carrito[indice].cantidad > 1) {
    carrito[indice].cantidad--;
  } else {
    carrito.splice(indice, 1);
  }

  guardarCarrito();

  mostrarCarrito();
}

function guardarCarrito() {
  localStorage.setItem(LLAVE, JSON.stringify(carrito));
}

function vaciarCarrito() {
  carrito = [];

  guardarCarrito();

  mostrarCarrito();
}

botonVaciar.addEventListener("click", function () {
  vaciarCarrito();
});

mostrarCarrito();
