import {InterCatalogo} from "./InterCatalogo";

/** Controlador de catálogo.
 * Es un ejemplo de Business Process (Proceso de Negocio).
 * @template T */
export class CtrlCatalogo {
    /** @param {string} mensajeNoEncontrado
     * @param {InterCatalogo<T>} interCat */
    constructor(mensajeNoEncontrado, interCat) {
        this.mensajeNoEncontrado = mensajeNoEncontrado;
        this.interCat = interCat;
    }

    /** @param {(error:Error)=>void} callbackError
     * @param {(modelos:T[])=>void} callback */
    consulta(callbackError, callback) {
        this.interCat.consulta(callbackError, callback);
    }

    /** @param {string} id
     * @returns {Promise<T>} */
    async busca(id) {
        const modelo = await this.interCat.busca(id);
        if (modelo) {
            return modelo;
        } else {
            throw new Error(this.mensajeNoEncontrado);
        }
    }

    /** @param {T} modelo */
    async agrega(modelo) {
        await this.interCat.agrega(modelo);
    }

    /** @param {T} modelo */
    async modifica(modelo) {
        await this.interCat.modifica(modelo);
    }

    /** @param {string} id */
    async elimina(id) {
        await this.interCat.elimina(id);
    }
}