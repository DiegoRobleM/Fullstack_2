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
                      <li><a class="dropdown-item" href="../Productos/pasteleria.html">Pastelería</a></li>
                      <li><a class="dropdown-item" href="#">Sin azúcar</a></li>
                      <li><a class="dropdown-item" href="#">Panadería</a></li>
                      <li><a class="dropdown-item" href="#">Salados</a></li>
                      <li><a class="dropdown-item" href="#">Cafetería</a></li>
                      <li><hr class="dropdown-divider" /></li>
                      <li><a class="dropdown-item" href="#">Ofertas </a></li>
                    </ul>
                  </li>
                  
                  <li class="nav-item">
                    <a class="nav-link" href="C:/Users/Diego/Desktop/Fullstack 2/Caso02/Contacto/contacto.html">Contacto </a>
                  </li>
                  
                  <li class="nav-item">
                    <a class="nav-link" href="../InicioSesion/iniciosesion.html">Iniciar Sesión </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="../SobreNosotros/sobrenosotros.html">Sobre nosotros </a>
                  </li>
                </ul>

                <form class="d-flex" role="search">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Buscar..."
                  />
                  <button class="btn btn-outline-success" type="submit">
                    Buscar
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </header>
        `;
    }
}

customElements.define('mi-navbar', MiNavbar);
