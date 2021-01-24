import {CtrlCatalogo} from "../libs/CtrlCatalogo";
import {CtrlSession} from "./CtrlSession";
import {CtrlUsuarios} from "./CtrlSession";
import {InterPasatiempos} from "./InterPasatiempos";
import {InterPrivilegios} from "./InterPrivilegios";
import {InterStorage} from "./InterStorage";
import {InterUsuarios} from "./InterUsuarios";
import {ForUsuarios} from "./ForUsuarios";

/** Usa el patrón Singleton. */
export class BaseDatos {
    constructor() {
        // @ts-ignore
        const firestore = firebase.firestore();
        // @ts-ignore
        const storage = firebase.storage();
        /** Tipo de autenticación de usuarios. En este caso es con Google. */
            // @ts-ignore
        const auth = firebase.auth();
        /** Tipo de autenticación de usuarios. En este caso es con Google. */
            // @ts-ignore
        const provider = new firebase.auth.GoogleAuthProvider();
        /* Configura el proveedor de Google para que permita seleccionar el
         * nombre de usuario en una lista. */
        provider.setCustomParameters({prompt: "select_account"});
        this.interStorage = new InterStorage(storage);
        this.interPasatiempos = new InterPasatiempos(firestore);
        this.interPrivilegios = new InterPrivilegios(firestore);
        this.interUsuarios = new InterUsuarios(firestore, this.interPasatiempos,
            this.interPrivilegios, this.interStorage);
        this.ctrlSession = new CtrlSession(auth, provider, this.interUsuarios);
        this.ctrlPasatiempos =
            new CtrlCatalogo("No se encontró el Hobbie.", this.interPasatiempos);
        this.ctrlUsuarios = new CtrlUsuarios("No se encontró el Hobbie.",
            this.interUsuarios, this.interPasatiempos, this.interPrivilegios);
        this.forUsuarios = new ForUsuarios();
    }
}

BaseDatos.instancia = Object.freeze(new BaseDatos());
