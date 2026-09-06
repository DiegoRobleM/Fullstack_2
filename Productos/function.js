const productos = [
    {
        id: 1,
        titulo: "Pastel de Chocolate",
        imagen: "img/pchoco.jpg",
        descripcion: "Delicioso pastel de bizcocho de chocolate con relleno de mermelada y manjar.",
        precio: 25000
    },
    {
        id: 2,
        titulo: "Pastel de Frutilla",
        imagen: "img/pfrut.jpg",
        descripcion: "Delicioso pastel de bizcocho de vainilla con relleno de frutilla y crema.",
        precio: 22000
    },
    {
        id: 3,
        titulo: "Pastel de Vainilla",
        imagen: "img/pvaini.jpg",
        descripcion: "Delicioso pastel de bizcocho de vainilla con relleno de vainilla y crema.",
        precio: 20000
    }
];


const contenedorProductos =
    document.querySelector(".contenedorProductos");


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

    let carrito =
        JSON.parse(localStorage.getItem(LLAVE)) || [];

    carrito.push(producto);

    localStorage.setItem(
        LLAVE,
        JSON.stringify(carrito)
    );

    console.log("Producto agregado:", producto);
}