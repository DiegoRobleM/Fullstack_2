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
              <button type="button" class="btn btn-ver">
                  Ver
              </button>
              <button type="button" class="btn btn-agregar">
                  Agregar al carrito
              </button>
            </div>
        </div>
    `;

  const btnVer = card.querySelector(".btn-ver");
  btnVer.addEventListener("click", function () {
    console.log("Producto seleccionado:", producto);
  });

  const btnAgregar = card.querySelector(".btn-agregar");
  btnAgregar.addEventListener("click", function () {
    guardar(producto);
  });

  contenedorProductos.appendChild(card);
}

const LLAVE = "carrito";

function guardar(producto) {
  const carrito = JSON.parse(localStorage.getItem(LLAVE)) || [];
  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    const nuevoItem = {
      ...producto,
      cantidad: 1,
    };

    carrito.push(nuevoItem);
  }

  localStorage.setItem(LLAVE, JSON.stringify(carrito));
  console.log("Producto agregado:", producto);
}
