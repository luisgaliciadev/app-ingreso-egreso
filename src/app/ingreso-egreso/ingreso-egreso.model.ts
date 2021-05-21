export class IngresoEgreso {
    descripcion: string;
    monto: number;
    tipo: string;
    uid?: string;

    constructor(obj: dataObj) {
        this.descripcion = obj && obj.descripcion || '';
        this.monto = obj && obj.monto || 0;
        this.tipo = obj && obj.tipo || '';
    }
}

interface dataObj {
    descripcion: string;
    monto: number;
    tipo: string;
}