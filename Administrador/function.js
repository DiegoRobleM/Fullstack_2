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
  mostrarConsultas();
}


function obtenerConsultas() {
  try {
    const consultasGuardadas = JSON.parse(
      localStorage.getItem("consultasContacto")
    );

    return Array.isArray(consultasGuardadas)
      ? consultasGuardadas
      : [];
  } catch (error) {
    return [];
  }
}

function crearCelda(texto) {
  const celda = document.createElement("td");
  celda.textContent = texto;

  return celda;
}

function obtenerClaseEstado(estado) {
  const clasesEstado = {
    pendiente: "text-bg-warning",
    "en revisión": "text-bg-primary",
    resuelta: "text-bg-success"
  };

  return clasesEstado[estado] || "text-bg-secondary";
}

function mostrarConsultas() {
  const tablaConsultas = document.querySelector(
    "#tabla-consultas"
  );

  const totalConsultas = document.querySelector(
    "#total-consultas"
  );

  const mensajeSinConsultas = document.querySelector(
    "#sin-consultas"
  );

  const contenedorTabla = document.querySelector(
    "#contenedor-tabla-consultas"
  );

  const consultas = obtenerConsultas();

  const consultasOrdenadas = [...consultas].sort(
    function (consultaA, consultaB) {
      return (
        new Date(consultaB.fecha) -
        new Date(consultaA.fecha)
      );
    }
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

    const fechaFormateada = new Date(
      consulta.fecha
    ).toLocaleString("es-CL");

    const celdaFecha = crearCelda(fechaFormateada);
    const celdaCorreo = crearCelda(consulta.correo);
    const celdaMensaje = crearCelda(consulta.mensaje);
    const celdaEstado = document.createElement("td");

    celdaMensaje.classList.add("celda-consulta");

    const estado = consulta.estado || "pendiente";
    const insigniaEstado = document.createElement("span");

    insigniaEstado.textContent = estado;
    insigniaEstado.className =
      `badge ${obtenerClaseEstado(estado)}`;

    celdaEstado.appendChild(insigniaEstado);

    fila.append(
      celdaFecha,
      celdaCorreo,
      celdaMensaje,
      celdaEstado
    );

    tablaConsultas.appendChild(fila);
  }
}