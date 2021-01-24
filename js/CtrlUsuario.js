import {CtrlCatalogo} from "../libs/CtrlCatalogo";
import {InterPasatiempos} from "./InterPasatiempos";
import {InterPrivilegios} from "./InterPrivilegios";
import {InterUsuarios} from "./InterUsuarios";
import {InfoPasatiempos} from "./InfoPasatiempos";
import {InfoPrivilegios} from "./InfoPrivilegios";
import {InfoUsuarios} from "./InfoUsuarios";

/** @extends {CtrlCatalogo<InfoUsuarios>} */
export class CtrlUsuario extends CtrlCatalogo {
    /** @param {string} mensajeNoEncontrado
     * @param {InterUsuarios} interUsuarios
     * @param {InterPasatiempos} interPasatiempos
     * @param {InterPrivilegios} interPrivilegios */
    constructor(mensajeNoEncontrado, interUsuarios, interPasatiempos,
                interPrivilegios) {
        super(mensajeNoEncontrado, daoUsuarios);
        this._interPasatiempos = interPasatiempos;
        this._interPrivilegios = interPrivilegios;
    }

    /** @param {(error: Error)=>void} callbackError
     * @param {(pasatiempos:InfoPasatiempos[])=>void} callbackPasatiempos
     * @param {(privilegios:InfoPrivilegios[])=>void} callbackPrivilegios */
    foráneas(callbackError, callbackPasatiempos, callbackPrivilegios) {
        this._interPasatiempos.consulta(callbackError, callbackPasatiempos);
        this._interPrivilegios.consulta(callbackError, callbackPrivilegios);
    }
}