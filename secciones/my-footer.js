class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* html */
            `Copyright &copy;2021 López Cruz Jorge Diego`
    }
}
customElements.define("my-footer", MyFooter);
