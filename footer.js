class MiFooter extends HTMLElement {
    connectedCallback() {

        const año = new Date().getFullYear();

        
        this.innerHTML = `
        <footer class="bg-light mt-auto py-3">
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