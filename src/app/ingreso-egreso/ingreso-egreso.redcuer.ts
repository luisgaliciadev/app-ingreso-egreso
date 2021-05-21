import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
};

export interface ingresoEgresoAppState extends AppState {
    ingresoEgreso: IngresoEgresoState;            
}

const initState: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer(state = initState, action: fromIngresoEgreso.Acciones): IngresoEgresoState {
    switch (action.type) {
        case fromIngresoEgreso.ItemsActionTypes.SET_ITEMS:
            // return {
            //     items: [action.items]
            // };

            return {
                items: [
                   ...action.items.map(item => {
                        return {
                            ...item
                        };
                   })
                ]
            };

        case fromIngresoEgreso.ItemsActionTypes.UNSET_ITEMS:
            return {
                items: []
            };

        default:
            return state;
    }
}
