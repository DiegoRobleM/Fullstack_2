const datosUsuario =
  sessionStorage.getItem("usuarioActivo") ||
  localStorage.getItem("usuarioActivo");

if (!datosUsuario) {
  window.location.replace("../InicioSesion/iniciosesion.html");
} else {
  const usuarioActivo = JSON.parse(datosUsuario);

  const nombreCompleto = `${usuarioActivo.nombre} ${usuarioActivo.apellido}`;

  const direccionCompleta = [
    usuarioActivo.direccion,
    usuarioActivo.tipoPropiedad,
    usuarioActivo.comuna,
  ]
    .filter(Boolean)
    .join(", ");

  document.querySelector("#perfil-nombre").textContent = nombreCompleto;
  document.querySelector("#perfil-email").textContent = usuarioActivo.email;
  document.querySelector("#perfil-direccion").textContent = direccionCompleta;

  const botonCerrarSesion = document.querySelector("#btn-cerrar-sesion");

  botonCerrarSesion.addEventListener("click", function () {
    sessionStorage.removeItem("usuarioActivo");
    localStorage.removeItem("usuarioActivo");
    window.location.replace("../InicioSesion/iniciosesion.html");
  });
}
