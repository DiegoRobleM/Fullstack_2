
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
                      <li><a class="dropdown-item" href="../salados/index.html">Salados</a></li>
                      <li><hr class="dropdown-divider" /></li>
                      <li><a class="dropdown-item" href="#">Ofertas </a></li>
                    </ul>
                  </li>
                  
                  <li class="nav-item">
                    <a class="nav-link" href="../Contacto/contacto.html">Contacto </a>
                  </li>
                  
                  <li class="nav-item">
                    <a class="nav-link" href="../InicioSesion/iniciosesion.html">Iniciar Sesión </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="../PerfilUsuario/index.html">Mi perfil </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="../SobreNosotros/sobrenosotros.html">Sobre nosotros </a>
                  </li>
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
        const activarDropdowns = () => {
      if (typeof bootstrap !== "undefined") {
        const elementosDropdown = this.querySelectorAll('[data-bs-toggle="dropdown"]');
        elementosDropdown.forEach((el) => new bootstrap.Dropdown(el));
      }
    };

    if (document.readyState === "complete") {
      activarDropdowns();
    } else {
      window.addEventListener("load", activarDropdowns);
    }
  }
  
}

customElements.define("mi-navbar", MiNavbar);
