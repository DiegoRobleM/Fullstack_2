const bootstrapScript = document.createElement("script");

bootstrapScript.src =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";

document.head.appendChild(bootstrapScript);

class MiFooter extends HTMLElement {
  connectedCallback() {
    const año = new Date().getFullYear();

    this.innerHTML = `
        <footer class="text-white py-3" style="background-color: #5c3d2e;">
            <div class="container d-flex justify-content-center align-items-center gap-4">

                <p class="mb-0">
                    &copy; ${año} Pastelería 1000 Sabores. Todos los derechos reservados.
                </p>

                <nav class="d-flex gap-3">
                    <a href="#" class="text-decoration-none text-white">
                        Política de Privacidad
                    </a>

                    <a href="#" class="text-decoration-none text-white">
                        Términos de Servicio
                    </a>

                    <a href="../Contacto/contacto.html"
                       class="text-decoration-none text-white">
                        Contacto
                    </a>
                </nav>

            </div>
        </footer>
        `;
  }
}

customElements.define("mi-footer", MiFooter);

function obtenerCantidadCarritoNavbar() {
  try {
    const carrito = JSON.parse(localStorage.getItem("carrito"));

    if (!Array.isArray(carrito)) {
      return 0;
    }

    return carrito.reduce(function (total, producto) {
      return total + Number(producto.cantidad || 0);
    }, 0);
  } catch (error) {
    return 0;
  }
}

function actualizarContadorCarrito() {
  const contador = document.querySelector("#contador-carrito");

  const enlaceCarrito = document.querySelector("#enlace-carrito-navbar");

  if (!contador || !enlaceCarrito) {
    return;
  }

  const cantidad = obtenerCantidadCarritoNavbar();

  if (cantidad <= 0) {
    contador.classList.add("d-none");

    enlaceCarrito.setAttribute("aria-label", "Carrito de compras vacío");

    return;
  }

  contador.textContent = cantidad > 99 ? "+99" : cantidad;

  contador.classList.remove("d-none");

  enlaceCarrito.setAttribute(
    "aria-label",
    `Carrito de compras: ${cantidad} unidades`,
  );
}

class MiNavbar extends HTMLElement {
  connectedCallback() {
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

    const enlaceAdministrador =
      usuarioActivo && usuarioActivo.rol === "admin"
        ? `
      <li>
        <a
          class="dropdown-item"
          href="../Administrador/index.html"
        >
          Panel de administración
        </a>
      </li>
    `
        : "";

    const menuSesion = usuarioActivo
      ? `
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle text-white"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i></i>
        <span id="nombre-usuario-navbar"></span>
      </a>

      <ul class="dropdown-menu">
        <li>
          <a
            class="dropdown-item"
            href="../PerfilUsuario/index.html"
          >
            Mi perfil
          </a>
        </li>
        
        ${enlaceAdministrador}

        <li>
          <button
            type="button"
            class="dropdown-item"
            id="btn-cerrar-sesion-navbar"
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </li>
  `
      : `
    <li class="nav-item">
      <a
        class="nav-link text-white"
        href="../InicioSesion/iniciosesion.html"
      >
        Iniciar sesión
      </a>
    </li>

    <li class="nav-item">
      <a
        class="nav-link text-white"
        href="../RegistroUsuario/registro.html"
      >
        Registrarse
      </a>
    </li>
  `;
    this.innerHTML = `
        <header>
          <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #5c3d2e;">
            <div class="container">
              <a class="navbar-brand fw-bold text-white" href="../Inicio/index.html">Pastelería 1000 Sabores</a>

              <button
                class="navbar-toggler border-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#menu"
                aria-controls="menu"
                aria-expanded="false"
                aria-label="Mostrar u ocultar menú de navegación"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="menu">
                <ul class="navbar-nav me-auto">
                  <li class="nav-item">
                    <a class="nav-link active text-white" href="../Inicio/index.html">Inicio</a>
                  </li>

                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle text-white"
                      href="#"
                      data-bs-toggle="dropdown"
                      >Productos</a
                    >

                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="../Pasteleria/pasteleria.html">Pastelería</a></li>
                      <li><a class="dropdown-item" href="../SinAzucar/sugar.html">Sin azúcar</a></li>
                      <li><a class="dropdown-item" href="../Panaderia/index.html">Panadería</a></li>
                      <li><a class="dropdown-item" href="../Salados/index.html">Salados</a></li>
                    </ul>
                  </li>
                  
                  <li class="nav-item">
                    <a class="nav-link text-white" href="../Contacto/contacto.html">Contacto </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link text-white" href="../SobreNosotros/sobrenosotros.html">Sobre nosotros </a>
                  </li>
 
                </ul>
                

                <div class="d-flex align-items-center ms-auto gap-3">

                  <ul class="navbar-nav flex-row align-items-center gap-2">
                    ${menuSesion}
                  </ul>

                  <a
                    id="enlace-carrito-navbar"
                    href="../Carrito/carrito.html"
                    class="btn btn-outline-light position-relative"
                    title="Carrito de compras"
                    aria-label="Carrito de compras"
                  >
                    <i class="bi bi-cart3"></i>

                    <span
                      id="contador-carrito"
                      class="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger d-none"
                      aria-hidden="true"
                    >
                      0
                    </span>
                  </a>
                  

                </div>
              </div>
            </div>
          </nav>
        </header>
        `;

    if (usuarioActivo) {
      const nombreNavbar = this.querySelector("#nombre-usuario-navbar");

      const botonCerrarSesion = this.querySelector("#btn-cerrar-sesion-navbar");

      nombreNavbar.textContent = `Hola, ${usuarioActivo.nombre}`;

      botonCerrarSesion.addEventListener("click", function () {
        sessionStorage.removeItem("usuarioActivo");
        localStorage.removeItem("usuarioActivo");

        window.location.replace("../InicioSesion/iniciosesion.html");
      });
    }
    actualizarContadorCarrito();
  }
}

customElements.define("mi-navbar", MiNavbar);
