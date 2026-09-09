const formularioInicioSesion = document.querySelector("#form-inicio-sesion");

const mensajeLogin = document.querySelector("#mensaje-login");

function mostrarMensaje(texto, tipo) {
  mensajeLogin.textContent = texto;
  mensajeLogin.className = `alert alert-${tipo}`;
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

function crearAdministradorDemo() {
  const usuarios = obtenerUsuariosRegistrados();

  const administradorExistente = usuarios.some(
    function (usuario) {
      return (
        usuario &&
        usuario.email === "admin@pasteleria.test"
      );
    }
  );

  if (administradorExistente) {
    return;
  }

  const administradorDemo = {
    nombre: "Administrador",
    apellido: "Demo",
    email: "admin@pasteleria.test",
    password: "AdminDemo123!",
    rol: "admin",
    direccion: "Dirección ficticia",
    tipoPropiedad: "Local",
    region: "metropolitana",
    comuna: "santiago",
    guardarDatos: false
  };

  usuarios.push(administradorDemo);

  localStorage.setItem(
    "usuariosRegistrados",
    JSON.stringify(usuarios)
  );
}

crearAdministradorDemo();

formularioInicioSesion.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const datosFormulario = new FormData(formularioInicioSesion);

  const email = datosFormulario.get("email").trim().toLowerCase();

  const password = datosFormulario.get("password");
  const recordarCuenta = datosFormulario.has("recordarCuenta");

  const usuarios = obtenerUsuariosRegistrados();

  const usuarioEncontrado = usuarios.find(function (usuario) {
    return usuario && usuario.email === email && usuario.password === password;
  });

  if (!usuarioEncontrado) {
    mostrarMensaje("El correo o la contraseña son incorrectos.", "danger");

    document.querySelector("#inputPassword").value = "";
    document.querySelector("#inputPassword").focus();
    return;
  }

  const usuarioActivo = {
    nombre: usuarioEncontrado.nombre,
    apellido: usuarioEncontrado.apellido,
    email: usuarioEncontrado.email,
    rol: usuarioEncontrado.rol || "cliente",
    direccion: usuarioEncontrado.direccion,
    tipoPropiedad: usuarioEncontrado.tipoPropiedad,
    region: usuarioEncontrado.region,
    comuna: usuarioEncontrado.comuna,
  };

  sessionStorage.removeItem("usuarioActivo");
  localStorage.removeItem("usuarioActivo");

  if (recordarCuenta) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
  } else {
    sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
  }

  mostrarMensaje(
    `Bienvenido, ${usuarioActivo.nombre}. Ingreso correcto.`,
    "success",
  );

  setTimeout(function () {
    window.location.href = "../PerfilUsuario/index.html";
  }, 1500);
});
