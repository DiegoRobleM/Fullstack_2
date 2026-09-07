const productos = [
    {
        id: 1,
        titulo: "Pan 5 cereales",
        imagen: "../panaderia/img/pan.jpg",
        descripcion: "Pan 5 cereales. Pan rustico de corteza crujiente, cubierto en semillas (sesamo, maravilla, zapallo) Contiene 60% harina de trigo y 40% de harina integral y semillas. Fermentacion lenta, solo con masa madre",
        precio: 2500
    },
    {
        id: 2,
        titulo: "Pan Ciabatta",
        imagen: "../panaderia/img/ciabatta.jpg",
        descripcion: "Pan ciabatta. Pan italiano de alta hidratacion y corteza delgada, contiene aceite de oliva. Forma rectangular.",
        precio: 2200
    },
    {
        id: 3,
        titulo: "Pan Integral",
        imagen: "../panaderia/img/integral.jpg",
        descripcion: "Pan integral con 100% harina integral. Tiene semillas de linaza, maravilla, zapallo, sesamo blanco y negro. Corteza de sesamo blanco y linaza. Fermentado con masa madre integral..",
        precio: 5200
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