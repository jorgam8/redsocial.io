import {InterCatalogo} from "../libs/InterCatalogo";
import {paraTodos} from "../libs/utils";
import {InterPasatiempos} from "./InterPasatiempos";
import {InterPrivilegios} from "./InterPrivilegios";
import {InterStorage} from "./InterStorage";
import {InfoUsuarios} from "./InfoUsuarios";

/** @implements {InterCatalogo<InfoUsuarios>} */
export class InterUsuarios {
    /** @param {{collection: (col: string) => any;}} firestore
     * @param {InterPasatiempos} interPasatiempos
     * @param {InterPrivilegios} interPrivilegios
     * @param {InterStorage} interStorage */
    constructor(firestore, interPasatiempos, interPrivilegios, interStorage) {
        this._coleccion = firestore.collection("AMIGO");
        this._interPasatiempos = interPasatiempos;
        this._interPrivilegios = interPrivilegios;
        this._interStorage = interStorage;
    }

    /** Crea un usuario a partir de un documento.
     * @return {Promise<InfoUsuarios>} */
    async _cargaUsuario(doc) {
        if (doc.exists) {
            const data = doc.data();
            return new InfoUsuarios({
                email: doc.id,
                avatar: null,
                urlDeAvatar: await this._interStorage.url(doc.id),
                pasatiempo: await this._interPasatiempos.busca(data.HOB_ID),
                privilegios: await this._interPrivilegios.buscaMuchos(data.PRIVS_IDS)
            });
        } else {
            return null;
        }
    }

    /** @param {(error: Error)=>void} callbackError
     * @param {(modelos:InfoUsuarios[])=>void} callback */
    consulta(callbackError, callback) {
        this._coleccion.onSnapshot(
            async querySnapshot => callback(await Promise.all(
                paraTodos(querySnapshot, doc => this._cargaUsuario(doc)))),
            /** @param {Error} error */
            error => {
                callbackError(error);
                // Intenta reconectarse.
                this.consulta(callbackError, callback);
            });
    }

    /** @param {string} id
     * @returns {Promise<InfoUsuarios>} */
    async busca(id) {
        let doc = id ? await this._coleccion.doc(id).get() : {exists: false};
        return this._cargaUsuario(doc);
    }

    /** @param {InfoUsuarios} modelo
     * @returns {Promise<void>} */
    async _modificaInterno(modelo) {
        await this._coleccion.doc(modelo.email).set({
            HOB_ID: modelo.pasatiempo ? (modelo.pasatiempo.id || null) : "",
            PRIVS_IDS: modelo.privilegios.map(p => p.nombre)
        });
        if (modelo.avatar && modelo.avatar.size > 0) {
            await this._interStorage.sube(modelo.email, modelo.avatar);
        }
    }

    /** @param {InfoUsuarios} modelo
     * @returns {Promise<void>} */
    async agrega(modelo) {
        modelo.validaAlAgregar();
        await this._modificaInterno(modelo);
    }

    /** @param {InfoUsuarios} modelo
     * @returns {Promise<void>} */
    async modifica(modelo) {
        modelo.validaAlModificar();
        await this._modificaInterno(modelo);
    }

    /** @param {string} id
     * @returns {Promise<void>} */
    async elimina(id) {
        await this._coleccion.doc(id).delete();
        await this._interStorage.elimina(id);
    }
}