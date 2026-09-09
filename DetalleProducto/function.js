const LLAVE_PRODUCTO = "productoSeleccionado";
const LLAVE_CARRITO = "carrito";

const mensajeDetalle = document.getElementById("mensaje-detalle");
const seccionDetalle = document.getElementById("detalle-producto");
const imagenDetalle = document.getElementById("detalle-imagen");
const categoriaDetalle = document.getElementById("detalle-categoria");
const tituloDetalle = document.getElementById("detalle-titulo");
const descripcionDetalle = document.getElementById("detalle-descripcion");
const precioDetalle = document.getElementById("detalle-precio");
const cantidadDetalle = document.getElementById("detalle-cantidad");
const btnAgregar = document.getElementById("btn-agregar-detalle");
const btnVolver = document.getElementById("btn-volver-catalogo");
const mensajeCarrito = document.getElementById("mensaje-carrito");

let productoSeleccionado = obtenerProductoSeleccionado();

if (productoSeleccionado) {
  mostrarProducto(productoSeleccionado);
} else {
  mostrarProductoNoEncontrado();
}

btnAgregar.addEventListener("click", agregarProductoAlCarrito);
btnVolver.addEventListener("click", volverAlCatalogo);

function obtenerProductoSeleccionado() {
  const productoGuardado = sessionStorage.getItem(LLAVE_PRODUCTO);

  if (!productoGuardado) {
    return null;
  }

  return JSON.parse(productoGuardado);
}

function mostrarProducto(producto) {
  imagenDetalle.src = producto.imagen;
  imagenDetalle.alt = producto.titulo;

  categoriaDetalle.textContent = obtenerCategoria(producto);
  tituloDetalle.textContent = producto.titulo;
  descripcionDetalle.textContent = producto.descripcion;
  precioDetalle.textContent = `$${producto.precio.toLocaleString("es-CL")}`;

  document.title = `${producto.titulo} | Pastelería 1000 Sabores`;

  btnAgregar.disabled = false;
}

function obtenerCategoria(producto) {
  if (producto.id.startsWith("pasteleria-")) {
    return "Pastelería";
  }

  if (producto.id.startsWith("panaderia-")) {
    return "Panadería";
  }

  if (producto.id.startsWith("salados-")) {
    return "Productos salados";
  }

  if (producto.id.startsWith("sin-azucar-")) {
    return "Productos sin azúcar";
  }

  return "Producto";
}

function mostrarProductoNoEncontrado() {
  seccionDetalle.classList.add("d-none");
  mensajeDetalle.classList.remove("d-none");

  mensajeDetalle.innerHTML = `
    No hay un producto seleccionado.
    <a href="../Pasteleria/pasteleria.html" class="alert-link">
      Volver al catálogo
    </a>
  `;
}

function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem(LLAVE_CARRITO);

  if (!carritoGuardado) {
    return [];
  }

  return JSON.parse(carritoGuardado);
}

function agregarProductoAlCarrito() {
  const cantidad = Number.parseInt(cantidadDetalle.value, 10);

  if (!Number.isInteger(cantidad) || cantidad < 1) {
    cantidadDetalle.value = 1;
    cantidadDetalle.focus();
    return;
  }

  const carrito = obtenerCarrito();

  const productoExistente = carrito.find(
    (item) => item.id === productoSeleccionado.id,
  );

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    const { paginaOrigen, ...datosProducto } = productoSeleccionado;

    carrito.push({
      ...datosProducto,
      cantidad,
    });
  }

  localStorage.setItem(LLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContadorCarrito();
  mostrarToast();
}

function mostrarToast() {
  mensajeCarrito.textContent = "🍰 ¡PRODUCTO AGREGADO A TU CARRITO!";

  mensajeCarrito.className = "toast-visible";

  setTimeout(() => {
    mensajeCarrito.className = "toast-oculto";
  }, 3000);
}

function volverAlCatalogo() {
  if (productoSeleccionado?.paginaOrigen) {
    window.location.href = productoSeleccionado.paginaOrigen;
    return;
  }

  window.location.href = "../Pasteleria/pasteleria.html";
}
