/** @typedef {Object} ParamPrivilegio
 * @property {string} nombre
 * @property {string} descripción */

export class InfoPrivilegios {
    /** @param {ParamPrivilegio} param0 */
    constructor({nombre, descripción}) {
        this.nombre = nombre;
        this.descripción = descripción;
    }
}