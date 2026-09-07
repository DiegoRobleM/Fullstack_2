const formularioContacto = document.querySelector(
  "#form-contacto"
);

const mensajeContacto = document.querySelector(
  "#mensaje-contacto"
);

function mostrarMensajeContacto(texto, tipo) {
  mensajeContacto.textContent = texto;
  mensajeContacto.className = `alert alert-${tipo}`;
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

formularioContacto.addEventListener(
  "submit",
  function (evento) {
    evento.preventDefault();

    const datosFormulario = new FormData(
      formularioContacto
    );

    const correo = datosFormulario
      .get("correo")
      .trim()
      .toLowerCase();

    const mensaje = datosFormulario
      .get("mensaje")
      .trim();

    if (!correo || !mensaje) {
      mostrarMensajeContacto(
        "Debes completar todos los campos.",
        "warning"
      );

      return;
    }

    const nuevaConsulta = {
      id: `consulta-${Date.now()}`,
      correo: correo,
      mensaje: mensaje,
      fecha: new Date().toISOString(),
      estado: "pendiente"
    };

    const consultas = obtenerConsultas();

    consultas.push(nuevaConsulta);

    localStorage.setItem(
      "consultasContacto",
      JSON.stringify(consultas)
    );

    mostrarMensajeContacto(
      "Tu consulta fue enviada correctamente.",
      "success"
    );

    formularioContacto.reset();
  }
);