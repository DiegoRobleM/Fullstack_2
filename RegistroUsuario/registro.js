const formularioRegistro = document.querySelector("#form-registro");
const mensajeRegistro = document.querySelector("#mensaje-registro");

function mostrarMensaje(texto, tipo) {
  mensajeRegistro.textContent = texto;
  mensajeRegistro.className = `alert alert-${tipo}`;

  mensajeRegistro.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

formularioRegistro.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const datosFormulario = new FormData(formularioRegistro);

  const nombre = datosFormulario.get("nombre").trim();
  const apellido = datosFormulario.get("apellido").trim();
  const email = datosFormulario.get("email").trim().toLowerCase();
  const password = datosFormulario.get("password");
  const direccion = datosFormulario.get("direccion").trim();
  const tipoPropiedad = datosFormulario.get("tipoPropiedad").trim();
  const region = datosFormulario.get("region");
  const comuna = datosFormulario.get("comuna").trim();
  const guardarDatos = datosFormulario.has("guardarDatos");


  const usuarios =
  JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
  
  const correoRegistrado = usuarios.some(
    (usuarioGuardado) => usuarioGuardado.email === email
  );

  if (correoRegistrado) {
  mostrarMensaje(
    "Ya existe una cuenta asociada a ese correo.",
    "danger"
  );

  document.querySelector("#inputEmail").focus();
  return;
}

  const usuario = {
  nombre: nombre,
  apellido: apellido,
  email: email,
  password: password,
  rol: "cliente",
  direccion: direccion,
  tipoPropiedad: tipoPropiedad,
  region: region,
  comuna: comuna,
  guardarDatos: guardarDatos
};

usuarios.push(usuario);

  localStorage.setItem(
    "usuariosRegistrados",
    JSON.stringify(usuarios)
  );

  mostrarMensaje(
  "Registro realizado correctamente. Serás redirigido al inicio de sesión.",
  "success"
);

formularioRegistro.reset();

setTimeout(function () {
  window.location.href = "../InicioSesion/iniciosesion.html";
}, 2500);
});
