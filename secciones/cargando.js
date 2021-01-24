class Cargando extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* html */
        `<progress max = "150">Cargando. Espere...</progress>`
    }
}
customElements.define("cargando", Cargando);