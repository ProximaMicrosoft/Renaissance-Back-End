
export class SaltSenha {
    salt: string;
    senhaprasalvar: string;

    constructor(salt: string, senhaprasalvar: string) {
        this.salt = salt;
        this.senhaprasalvar = senhaprasalvar;
    }
}