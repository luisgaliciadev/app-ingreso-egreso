import { Action } from "@ngrx/store";
import { User } from './register/user.model';

export const  AuthActionTypes  =  { 
    SET_USER: '[Auth] Set User'
};

export class SetUserAction implements Action {
    readonly type = AuthActionTypes.SET_USER;
    constructor(public user: User) {}
};

export type Acciones = SetUserAction;
