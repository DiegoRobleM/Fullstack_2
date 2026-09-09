const datosUsuario =
  sessionStorage.getItem("usuarioActivo") ||
  localStorage.getItem("usuarioActivo");

let usuarioActivo = null;

if (datosUsuario) {
  try {
    usuarioActivo = JSON.parse(datosUsuario);
  } catch (error) {
    sessionStorage.removeItem("usuarioActivo");
    localStorage.removeItem("usuarioActivo");
  }
}

if (!usuarioActivo) {
  window.location.replace("../InicioSesion/iniciosesion.html");
} else if (usuarioActivo.rol !== "admin") {
  window.location.replace("../Inicio/index.html");
} else {
  const panelAdmin = document.querySelector("#panel-admin");

  const saludoAdmin = document.querySelector("#saludo-admin");

  saludoAdmin.textContent =
    `Sesión iniciada como ${usuarioActivo.nombre} ` +
    `${usuarioActivo.apellido}.`;

  panelAdmin.classList.remove("d-none");

  inicializarPanelConsultas();
  inicializarPanelUsuarios();
}

function inicializarPanelConsultas() {
  const btnVerConsultas = document.querySelector("#btn-ver-consultas");

  const seccionConsultas = document.querySelector("#seccion-consultas");

  btnVerConsultas.addEventListener("click", function () {
    seccionConsultas.classList.remove("d-none");

    mostrarConsultas();

    seccionConsultas.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function inicializarPanelUsuarios() {
  const btnVerUsuarios = document.querySelector("#btn-ver-usuarios");

  const seccionUsuarios = document.querySelector("#seccion-usuarios");

  btnVerUsuarios.addEventListener("click", function () {
    seccionUsuarios.classList.remove("d-none");

    mostrarUsuarios();

    seccionUsuarios.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function obtenerConsultas() {
  try {
    const consultasGuardadas = JSON.parse(
      localStorage.getItem("consultasContacto"),
    );

    return Array.isArray(consultasGuardadas) ? consultasGuardadas : [];
  } catch (error) {
    return [];
  }
}

function obtenerUsuarios() {
  try {
    const usuariosGuardados = JSON.parse(
      localStorage.getItem("usuariosRegistrados"),
    );

    return Array.isArray(usuariosGuardados) ? usuariosGuardados : [];
  } catch (error) {
    return [];
  }
}

function crearCelda(texto) {
  const celda = document.createElement("td");

  celda.textContent = texto;

  return celda;
}

function cambiarEstadoConsulta(consultaId, nuevoEstado) {
  const consultas = obtenerConsultas();

  const consultaEncontrada = consultas.find(function (consulta) {
    return consulta.id === consultaId;
  });

  if (!consultaEncontrada) {
    return;
  }

  consultaEncontrada.estado = nuevoEstado;

  localStorage.setItem("consultasContacto", JSON.stringify(consultas));

  mostrarConsultas();
}

function mostrarConsultas() {
  const tablaConsultas = document.querySelector("#tabla-consultas");

  const totalConsultas = document.querySelector("#total-consultas");

  const mensajeSinConsultas = document.querySelector("#sin-consultas");

  const contenedorTabla = document.querySelector("#contenedor-tabla-consultas");

  const consultas = obtenerConsultas();

  const consultasOrdenadas = [...consultas].sort(
    function (consultaA, consultaB) {
      return new Date(consultaB.fecha) - new Date(consultaA.fecha);
    },
  );

  tablaConsultas.textContent = "";
  totalConsultas.textContent = consultasOrdenadas.length;

  if (consultasOrdenadas.length === 0) {
    mensajeSinConsultas.classList.remove("d-none");
    contenedorTabla.classList.add("d-none");

    return;
  }

  mensajeSinConsultas.classList.add("d-none");
  contenedorTabla.classList.remove("d-none");

  for (const consulta of consultasOrdenadas) {
    const fila = document.createElement("tr");

    fila.dataset.consultaId = consulta.id;

    const fechaFormateada = new Date(consulta.fecha).toLocaleString("es-CL");
    const celdaFecha = crearCelda(fechaFormateada);
    const celdaCorreo = crearCelda(consulta.correo);
    const celdaMensaje = crearCelda(consulta.mensaje);
    const celdaEstado = document.createElement("td");

    celdaMensaje.classList.add("celda-consulta");

    const estado = consulta.estado || "pendiente";
    const selectorEstado = document.createElement("select");

    selectorEstado.className = "form-select form-select-sm";

    selectorEstado.setAttribute(
      "aria-label",
      `Cambiar estado de la consulta de ${consulta.correo}`,
    );

    selectorEstado.innerHTML = `
      <option value="pendiente">Pendiente</option>
      <option value="en revisión">En revisión</option>
      <option value="resuelta">Resuelta</option>
    `;

    selectorEstado.value = estado;

    selectorEstado.addEventListener("change", function () {
      cambiarEstadoConsulta(consulta.id, selectorEstado.value);
    });

    celdaEstado.appendChild(selectorEstado);

    fila.append(celdaFecha, celdaCorreo, celdaMensaje, celdaEstado);

    tablaConsultas.appendChild(fila);
  }
}

function mostrarUsuarios() {
  const tablaUsuarios = document.querySelector("#tabla-usuarios");
  const totalUsuarios = document.querySelector("#total-usuarios");
  const mensajeSinUsuarios = document.querySelector("#sin-usuarios");
  const contenedorTabla = document.querySelector("#contenedor-tabla-usuarios");
  const usuarios = obtenerUsuarios();

  tablaUsuarios.textContent = "";
  totalUsuarios.textContent = usuarios.length;

  if (usuarios.length === 0) {
    mensajeSinUsuarios.classList.remove("d-none");
    contenedorTabla.classList.add("d-none");

    return;
  }

  mensajeSinUsuarios.classList.add("d-none");
  contenedorTabla.classList.remove("d-none");

  for (const usuario of usuarios) {
    const nombreCompleto =
      `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim();

    const celdaNombre = crearCelda(nombreCompleto || "Sin nombre");
    const celdaCorreo = crearCelda(usuario.email || "No indicado");
    const celdaRegion = crearCelda(usuario.region || "No indicada");
    const celdaComuna = crearCelda(usuario.comuna || "No indicada");
    const celdaPropiedad = crearCelda(usuario.tipoPropiedad || "No indicada");
    const celdaRol = document.createElement("td");
    const insigniaRol = document.createElement("span");
    const rol = usuario.rol || "cliente";

    insigniaRol.textContent = rol === "admin" ? "Administrador" : "Cliente";

    insigniaRol.className =
      rol === "admin" ? "badge text-bg-danger" : "badge text-bg-secondary";

    celdaRol.appendChild(insigniaRol);

    const fila = document.createElement("tr");

    fila.append(
      celdaNombre,
      celdaCorreo,
      celdaRegion,
      celdaComuna,
      celdaPropiedad,
      celdaRol,
    );

    tablaUsuarios.appendChild(fila);
  }
}
