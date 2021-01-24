import {InterCatalogo} from "../libs/InterCatalogo";
import {paraTodos, trims} from "../libs/utils";
import {InfoPasatiempos} from "./InfoPasatiempos";

/** @implements {InterCatalogo<InfoPasatiempo>} */
export class InterPasatiempos {
    /** @param {{collection: (col: string) => any; }} firestore */
    constructor(firestore) {
        this._coleccion = firestore.collection("HOBBIES");
    }

    /** Crea un pasatiempo a partir de un documento.
     * @return {InfoPasatiempos} */
    _cargaPasatiempo(doc) {
        if (doc.exists) {
            const data = doc.data();
            return new InfoPasatiempos({
                id: doc.id,
                nombre: data.PAS_NOMBRE
            });
        } else {
            return null;
        }
    }

    /** @param {(error: Error)=>void} callbackError
     * @param {(modelos:InfoPasatiempos[])=>void} callback */
    consulta(callbackError, callback) {
        /* Pide todos los registros de la colección "PASATIEMPO" ordenados por
         * el campo "PAS_NOMBRE" de forma ascendente. */
        this._coleccion.orderBy("PAS_NOMBRE").onSnapshot(
            querySnapshot => callback(
                paraTodos(querySnapshot, doc => this._cargaPasatiempo(doc))),
            /** @param {Error} error */
            error => {
                callbackError(error);
                // Intenta reconectarse.
                this.consulta(callbackError, callback);
            }
        );
    }

    /** @param {string} id
     * @returns {Promise<InfoPasatiempos>} */
    async busca(id) {
        let doc = id ? await this._coleccion.doc(id).get() : {exists: false};
        return this._cargaPasatiempo(doc);
    }

    /** @param {InfoPasatiempos} modelo
     * @returns {Promise<void>} */
    async agrega(modelo) {
        modelo.valida();
        await this._coleccion.add({
            PAS_NOMBRE: trims(modelo.nombre)
        });
    }

    /** @param {InfoPasatiempos} modelo
     * @returns {Promise<void>} */
    async modifica(modelo) {
        modelo.valida();
        await this._coleccion.doc(modelo.id).set({
            PAS_NOMBRE: trims(modelo.nombre)
        });
    }

    /** @param {string} id
     * @returns {Promise<void>} */
    async elimina(id) {
        await this._coleccion.doc(id).delete();
    }
}