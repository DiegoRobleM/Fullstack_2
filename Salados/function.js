const productos = [
    {
        id: 1,
        titulo: "Quiche de alcachofa y palmitos",
        imagen: "../salados/img/quiche.jpg",
        descripcion: "Quiche de alcachofa y palmitos. Masa con suave y cremoso relleno de fondos de alcachofa, palmitos, ricota y tomates cherry.",
        precio: 29900
    },
    {
        id: 2,
        titulo: "Quiche de espinaca ricota y champinon ",
        imagen: "../salados/img/qespi.jpg",
        descripcion: "Quiche de alcachofa y palmitos. Masa con suave y cremoso relleno de fondos de alcachofa, palmitos, ricota y tomates cherry.",
        precio: 28000
    },
    {
        id: 3,
        titulo: "Quiche de pollo choclo y pimenton",
        imagen: "../salados/img/qpoio.jpg",
        descripcion: "Quiche de pollo, choclo y pimenton. Masa con suave y cremoso relleno, con trozos de pollo, choclo y pimenton salteado.",
        precio: 25500
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

    const productoExistente =
        carrito.find(item => item.id === producto.id);

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        producto.cantidad = 1;

        carrito.push(producto);

    }

    localStorage.setItem(
        LLAVE,
        JSON.stringify(carrito)
    );

    console.log("Producto agregado:", producto);
}