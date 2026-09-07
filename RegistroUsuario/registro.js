const formularioRegistro = document.querySelector("#form-registro");

formularioRegistro.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const datosFormulario = new FormData(formularioRegistro);

  const nombre = datosFormulario.get("nombre").trim();
  const apellido = datosFormulario.get("apellido").trim();
  const email = datosFormulario.get("email").trim().toLowerCase();
  const direccion = datosFormulario.get("direccion").trim();
  const tipoPropiedad = datosFormulario.get("tipoPropiedad").trim();
  const region = datosFormulario.get("region");
  const comuna = datosFormulario.get("comuna").trim();
  const guardarDatos = datosFormulario.has("guardarDatos");

  const usuario = {
  nombre: nombre,
  apellido: apellido,
  email: email,
  direccion: direccion,
  tipoPropiedad: tipoPropiedad,
  region: region,
  comuna: comuna,
  guardarDatos: guardarDatos
};

const usuarioConvertido = JSON.stringify(usuario);

sessionStorage.setItem("usuarioRegistrado", usuarioConvertido);

if (guardarDatos) {
  localStorage.setItem("usuarioRegistrado", usuarioConvertido);
} else {
  localStorage.removeItem("usuarioRegistrado");
}

console.log(usuario);
});
