import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';

export const  ItemsActionTypes  =  { 
    SET_ITEMS: '[Ingreso Egreso] Set Items',
    UNSET_ITEMS: '[Ingreso Egreso] Unset Items'
};

export class SetItemsAction implements Action {
    readonly type = ItemsActionTypes.SET_ITEMS;

    constructor(public items: IngresoEgreso[]) { }
}

export class UnsetItemsAction implements Action {
    readonly type = ItemsActionTypes.UNSET_ITEMS;
}

export type Acciones = SetItemsAction | SetItemsAction;
