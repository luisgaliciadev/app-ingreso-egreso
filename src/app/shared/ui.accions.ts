import { Action } from "@ngrx/store";

export const  UserActionTypes  =  { 
    ACTIVAR_LOADING: '[UI Loading] Cargando...',
    DESACTIVAR_LOADING: '[UI Loading] Fin de carga...'
  } ;

// export const ACTIVAR_LOADING = '[UI Loading] Cargando...';
// export const DESACTIVAR_LOADING = '[UI Loading] Fin de carga...';

export class ActivarLoadingAction implements Action {
    readonly type = UserActionTypes.ACTIVAR_LOADING;
};

export class DesactivarLoadingAction implements Action {
    readonly type = UserActionTypes.DESACTIVAR_LOADING;
   
};

export type Acciones = ActivarLoadingAction | DesactivarLoadingAction;