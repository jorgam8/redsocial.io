class Menus extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
            `<ul>
            <li><a href = "index.html">Bienvenido<a/></li>
            </ul>`;
        this.ul = this.querySelector("ul");
    }

    /**
     * @param {Set<string>} privilegios
     */
    acceso(privilegios) {
        let html = "";
        if (privilegios.has("Hobbies")) {
            html += `<li><a href = "hobbies.html">Hobbies</a></li>`;
        }

        if (privilegios.has("Amigos")) {
            html += `<li><a href = "amigos.html">Amigos</a></li>`;
        }

        if (privilegios.has("Peliculas")) {
            html += `<li><a href = "peliculas.html">Películas</a></li>`
        }

        if (privilegios.has("Musica")) {
            html += `<li><a href = "musica.html">Música</a></li>`
        }

        this.ul.innerHTML += html;
    }
}

customElements.define("menus", Menus);
