import { ActionReducerMap, Action } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
// import * as fromAuthAccions from './auth/auth.accions';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.redcuer';
// import * as fromIngresoEgresoActions from './ingreso-egreso/ingreso-egreso.actions';

export interface AppState {
    ui: fromUi.State;
    auth: fromAuth.AuthState;
    // ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

export const AppReducers: ActionReducerMap<AppState, any> = {
   ui: fromUi.uiReducer,
   auth: fromAuth.authReducer,
//    ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
};
