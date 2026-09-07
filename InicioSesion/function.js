const formularioInicioSesion = document.querySelector("#form-inicio-sesion");

const mensajeLogin = document.querySelector("#mensaje-login")

function mostrarMensaje(texto,tipo){
    mensajeLogin.textContent = texto;
    mensajeLogin.className = `alert alert-${tipo}`;
}

formularioInicioSesion.addEventListener("submit", function(evento){
    evento.preventDefault();


const datosFormulario = new FormData(formularioInicioSesion);

const email = datosFormulario.get("email").trim().toLowerCase();

const password = datosFormulario.get("password");
const recordarCuenta = datosFormulario.has("recordarCuenta");

const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

const usuarioEncontrado = usuarios.find(function (usuario){
    return(
        usuario.email === email && usuario.password === password
    );
});

if (!usuarioEncontrado){
    mostrarMensaje("El correo o la contraseña son incorrectos.","danger");


document.querySelector("#inputPassword").value = "";
document.querySelector("#inputPassword").focus();
return;
}

const usuarioActivo = {
    nombre: usuarioEncontrado.nombre,
    apellido: usuarioEncontrado.apellido,
    email: usuarioEncontrado.email,
    rol: usuarioEncontrado.rol || "cliente",
    direccion : usuarioEncontrado.direccion,
    tipoPropiedad: usuarioEncontrado.tipoPropiedad,
    region: usuarioEncontrado.region,
    comuna: usuarioEncontrado.comuna
};

sessionStorage.removeItem("usuarioActivo");
localStorage.removeItem("usuarioActivo");

if(recordarCuenta){
    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuarioActivo)
    );
}else{
    sessionStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuarioActivo)
    );
}

mostrarMensaje(
    `Bienvenido, ${usuarioActivo.nombre}. Ingreso correcto.`,
    "success"
);

setTimeout(function(){
    window.location.href = "../PerfilUsuario/index.html";
},1500);
});