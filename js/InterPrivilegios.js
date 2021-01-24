import {paraTodos} from "../libs/utils";
import {InfoPrivilegios} from "./InfoPrivilegios";

export class InterPrivilegios {
    /** @param {{collection: (col: string) => any; }} firestore */
    constructor(firestore) {
        this._coleccion = firestore.collection("PRIVILEGIO");
    }

    /** Crea un privilegio a partir de un documento.
     * @return {InfoPrivilegios} */
    _cargaPrivilegio(doc) {
        if (doc.exists) {
            const data = doc.data();
            return new InfoPrivilegios({
                nombre: doc.id,
                descripción: data.PRIV_DESCR || ""
            });
        } else {
            return null;
        }
    }

    /** @param {(error: Error)=>void} callbackError
     * @param {(modelos:InfoPrivilegios[])=>void} callback */
    consulta(callbackError, callback) {
        /* Pide todos los documentos de la colección "PRIVILEGIO". */
        this._coleccion.onSnapshot(
            querySnapshot => callback(
                paraTodos(querySnapshot, doc => this._cargaPrivilegio(doc))),
            /** @param {Error} error */
            error => {
                callbackError(error);
                // Intenta reconectarse.
                this.consulta(callbackError, callback);
            }
        );
    }

    /** Busca privilegios en base a sus id.
     * @param {string[]} ids
     * @returns {Promise<InfoPrivilegios[]>} */
    async buscaMuchos(ids) {
        ids = ids || [];
        let docs = await Promise.all(ids.map(
            id => id ? this._coleccion.doc(id).get() : {exists: false}));
        return docs.map(doc => this._cargaPrivilegio(doc)).filter(Boolean);
    }
}