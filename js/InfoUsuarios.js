import {valida} from "../libs/utils";
import {InfoPasatiempos} from "./InfoPasatiempos";
import {InfoPrivilegios} from "./InfoPrivilegios";

/** @typedef {Object} ParamUsuario
 * @property {string} email
 * @property {File} avatar
 * @property {string} urlDeAvatar
 * @property {InfoPasatiempos} pasatiempo
 * @property {InfoPrivilegios[]} privilegios */
export class InfoUsuarios {
    /** @param {ParamUsuario} param0  */
    constructor({email, avatar, urlDeAvatar, pasatiempo, privilegios}) {
        this.email = email;
        this.avatar = avatar;
        this.urlDeAvatar = urlDeAvatar;
        this.pasatiempo = pasatiempo;
        this.privilegios = privilegios;
    }

    validaAlAgregar() {
        valida(this.email, "Proporcione un e-mail");
        valida(this.avatar && this.avatar.size > 0,
            "Falta proporcionar el avatar.");
    }

    validaAlModificar() {
        valida(this.email, "Proporcione un e-mail");
    }
}