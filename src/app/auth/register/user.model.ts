export class User {
    public nombre: string;
    public email: string;
    public uid: string;

    constructor(obj: dataObj) {
        this.nombre = obj && obj.nombre || '';
        this.email = obj && obj.email || '';
        this.uid = obj && obj.uid || '';
    }

}

interface dataObj {
    uid: string;
    email: string;
    nombre: string
}