const bootstrapScript = document.createElement("script");

bootstrapScript.src =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";

document.head.appendChild(bootstrapScript);

class MiFooter extends HTMLElement {
  connectedCallback() {
    const año = new Date().getFullYear();

    this.innerHTML = `
        <footer class="bg-light py-3">
            <div class="container d-flex justify-content-center align-items-center gap-4">

                <p class="mb-0">
                    &copy; ${año} Pastelería 1000 Sabores. Todos los derechos reservados.
                </p>

                <nav class="d-flex gap-3">
                    <a href="#" class="text-decoration-none text-dark">
                        Política de Privacidad
                    </a>

                    <a href="#" class="text-decoration-none text-dark">
                        Términos de Servicio
                    </a>

                    <a href="../Contacto/contacto.html"
                       class="text-decoration-none text-dark">
                        Contacto
                    </a>
                </nav>

            </div>
        </footer>
        `;
  }
}

customElements.define("mi-footer", MiFooter);

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

    const menuSesion = usuarioActivo
      ? `
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="bi bi-person-circle"></i>
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
        class="nav-link"
        href="../InicioSesion/iniciosesion.html"
      >
        Iniciar sesión
      </a>
    </li>

    <li class="nav-item">
      <a
        class="nav-link"
        href="../RegistroUsuario/registro.html"
      >
        Registrarse
      </a>
    </li>
  `;
    this.innerHTML = `
        <header>
          <nav class="navbar navbar-expand-lg bg-light">
            <div class="container">
              <a class="navbar-brand fw-bold" href="../Inicio/index.html">Pastelería 1000 Sabores</a>

              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#menu"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="menu">
                <ul class="navbar-nav me-auto">
                  <li class="nav-item">
                    <a class="nav-link active" href="../Inicio/index.html">Inicio</a>
                  </li>

                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
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
                    <a class="nav-link" href="../Contacto/contacto.html">Contacto </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="../SobreNosotros/sobrenosotros.html">Sobre nosotros </a>
                  </li>

                  ${menuSesion}
                </ul>
                

                <div class="d-flex align-items-center ms-auto">

                  <form class="d-flex" role="search">
                      <input
                          class="form-control me-2"
                          type="search"
                          placeholder="Buscar..."
                      />

                      <button class="btn btn-outline-dark btn-zoom" type="submit">
                      Buscar
                      </button>
                  </form>

                  <a
                      href="../Carrito/carrito.html"
                      class="btn btn-outline-dark ms-3"
                      title="Carrito de compras"
                  >
                      <i class="bi bi-cart3"></i>
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
  }
}

customElements.define("mi-navbar", MiNavbar);
