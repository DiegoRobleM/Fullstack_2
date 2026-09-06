const LLAVE = "carrito";

const carrito = JSON.parse(localStorage.getItem(LLAVE)) || [];

console.log(carrito);

const contenedorCarrito = document.getElementById("carrito");
const totalElemento = document.getElementById("total");


let total = 0;

for (const producto of carrito) {

    console.log(producto.titulo);

}

for (const producto of carrito) {

    const item = document.createElement("div");

    item.className = "card mb-3";

    item.innerHTML = `
        <div class="card-body">

            <h5 class="card-title">
                ${producto.titulo}
            </h5>

            <p class="card-text">
                Precio: $${producto.precio.toLocaleString("es-CL")}
            </p>

        </div>
    `;
    
    contenedorCarrito.appendChild(item);
    total = total + producto.precio;
}

totalElemento.textContent =
    "$" + total.toLocaleString("es-CL");