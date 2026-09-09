const productos = window.productos;
const contenedorProductos = document.querySelector(".contenedorProductos");

for (const producto of productos) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
        <img
            src="${producto.imagen}"
            alt="${producto.titulo}"
            class="card-img-top"
        >

        <div class="card-body">
            <h5 class="card-title">
                ${producto.titulo}
            </h5>

            <p class="card-text text-muted">
                ${producto.descripcion}
            </p>

            <p class="card-text">
                Precio: $${producto.precio.toLocaleString("es-CL")}
            </p>

            <div class="contenedor-btn">
                <button
                    type="button"
                    class="btn btn-outline-info btn-ver"
                >
                    Ver
                </button>

                <button
                    type="button"
                    class="btn btn-outline-success btn-agregar"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    `;

  const btnVer = card.querySelector(".btn-ver");

  btnVer.addEventListener("click", function () {
    const productoParaDetalle = {
      ...producto,
      paginaOrigen: window.location.href,
    };

    sessionStorage.setItem(
      "productoSeleccionado",
      JSON.stringify(productoParaDetalle),
    );

    window.location.href = "../DetalleProducto/index.html";
  });

  const btnAgregar = card.querySelector(".btn-agregar");
  btnAgregar.addEventListener("click", function () {
    guardar(producto);
    mostrarToast(); //EN ESTA PARTE ACTIVAMOS EL MENSAJE
  });

  contenedorProductos.appendChild(card);
}

const LLAVE = "carrito";

function obtenerCarrito() {
  try {
    const textoGuardado = localStorage.getItem(LLAVE);
    const datosGuardados = JSON.parse(textoGuardado);

    if (Array.isArray(datosGuardados)) {
      return datosGuardados;
    }

    return [];
  } catch (error) {
    console.warn("No se pudo leer el carrito guardado. Se iniciará uno nuevo.");

    return [];
  }
}

function guardar(producto) {
  const carrito = obtenerCarrito();
  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    const nuevoItem = {
      ...producto, //LLAMA AL OJBETO DE PRODUCTO Y TRAE UNO IGUAL. PERO COPIA.
      cantidad: 1,
    };

    carrito.push(nuevoItem);
  }

  localStorage.setItem(LLAVE, JSON.stringify(carrito));
  actualizarContadorCarrito();
  console.log("Producto agregado:", producto);
}

function mostrarToast() {
  const toast = document.getElementById("toast-notificacion");
  // AQUI SE CAMBIA LA CLASE PARA QUE SE HAGA VISIBLE
  toast.className = "toast-visible";
  // DESPUES DE 3 SEGUNDOS DESAPARECE
  setTimeout(() => {
    toast.className = "toast-oculto";
  }, 3000);
}
