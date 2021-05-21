import * as fromAuth from './auth.accions';
import { User } from './register/user.model';

export interface AuthState {
    user: User;
};

const initState: AuthState = {
    user: {
        nombre: '',
        email: '',
        uid: ''
    }
    // user: null
};

export function authReducer(state = initState, action: fromAuth.Acciones): AuthState {
    switch(action.type) {
        case fromAuth.AuthActionTypes.SET_USER:
            return {
                user: { ... action.user }
            }
            
        default:
            return state;
    }
}





