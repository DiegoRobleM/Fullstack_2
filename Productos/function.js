console.log("DSY1104-012D");

function guardarUser(){
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var contrasena = document.getElementById("contrasena").value;
}



productos = [
        {
            nombre: "Pastel de Chocolate",
            descripcion: "Deliciosos pastel de bizcocho chocolate con relleno de mermelada y manjar.",
            precio: 25000,
            imagen: "img/pchoco.jpg"
        },
        {
            nombre: "Pastel de Vainilla",
            descripcion: "Deliciosos pastel de bizcocho vainilla con relleno de mermelada y manjar.",
            precio: 20000,
            imagen: "img/pvaini.jpg"
        },
        {
            nombre: "Pastel de Frutilla",
            descripcion: "Deliciosos pastel de bizcocho frutilla con relleno de mermelada y manjar.",
            precio: 23000,
            imagen: "img/pfrut.jpg"
        }
]



const contenedorProductos = document.getElementById("productos");
console.log(contenedorProductos);

const LLAVE = "llave123";

function guardar(produtos) {
    console.log(productos);
    lista = [];

    var storageActual = localStorage.getItem(LLAVE);
    var storageParse = JSON.parse(storageActual);

    if (storageParse != null) {
        lista = storageParse;
        localStorage.setItem(LLAVE, JSON.stringify(storageParse));
    }else{
        lista.push(productos);
        localStorage.setItem(LLAVE, JSON.stringify(lista));
    }
}