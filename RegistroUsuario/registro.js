const formularioRegistro = document.querySelector("#form-registro");
const mensajeRegistro = document.querySelector("#mensaje-registro");

function mostrarMensaje(texto, tipo) {
  mensajeRegistro.innerHTML = texto;
  mensajeRegistro.className = `alert alert-${tipo}`;
  mensajeRegistro.classList.remove("d-none"); 

  mensajeRegistro.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

function obtenerUsuariosRegistrados() {
  try {
    const textoGuardado = localStorage.getItem("usuariosRegistrados");
    const datosGuardados = JSON.parse(textoGuardado);

    return Array.isArray(datosGuardados) ? datosGuardados : [];
  } catch (error) {
    console.warn("No se pudieron leer los usuarios registrados.");
    return [];
  }
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

  let errores = [];

  if (nombre === "") {
    errores.push("El nombre es obligatorio.");
  }
  if (apellido === "") {
    errores.push("El apellido es obligatorio.");
  }
  if (email === "") {
    errores.push("El correo es obligatorio.");
  } else if (!email.includes("@") || !email.includes(".")) {
    errores.push("El correo debe ser válido (contener @ y un punto).");
  }
  if (password.length < 8) {
    errores.push("La contraseña debe tener al menos 8 caracteres.");
  }
  if (direccion === "") {
    errores.push("La dirección es obligatoria.");
  }
  if (!region || region === "") {
    errores.push("Debes seleccionar una región.");
  }
  if (comuna === "") {
    errores.push("La comuna es obligatoria.");
  }

  if (errores.length > 0) {
    mostrarMensaje(errores.join("<br>"), "danger");
    return; 
  }
 
  // AQUI LA PARTE DEL GUARDADO, ARRIBA ES SOLO VALIDACIONES
  
  const usuarios = obtenerUsuariosRegistrados();

  const correoRegistrado = usuarios.some(
    (usuarioGuardado) =>
      usuarioGuardado && usuarioGuardado.email === email
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
  usuarios.push(usuario);

  localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));

  mostrarMensaje(
    "Registro realizado correctamente. Serás redirigido al inicio de sesión.",
    "success"
  );

  formularioRegistro.reset();
  formularioRegistro.reset();

  setTimeout(function () {
    window.location.href = "../InicioSesion/iniciosesion.html";
  }, 2500);
  setTimeout(function () {
    window.location.href = "../InicioSesion/iniciosesion.html";
  }, 2500);
});