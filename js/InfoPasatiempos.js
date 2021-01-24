import {valida} from "../libs/utils";

/** @typedef {Object} ParamPasatiempo
 * @property {string} id
 * @property {string} nombre */

export class InfoPasatiempos {
    /** @param {ParamPasatiempo} param0 */
    constructor({id, nombre}) {
        this.id = id;
        this.nombre = nombre;
    }

    valida() {
        valida(this.nombre, "Proporcione un nombre");
    }
}