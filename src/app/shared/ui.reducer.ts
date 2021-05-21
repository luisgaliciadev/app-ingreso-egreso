import * as fromUi from './ui.accions';

export interface State {
    isLoading: boolean;
};

const initState: State = {
    isLoading: false
};

export function uiReducer (state = initState, action: fromUi.Acciones): State {
    switch (action.type) {
        case fromUi.UserActionTypes.ACTIVAR_LOADING:
            return {
                isLoading: true
            };

        case fromUi.UserActionTypes.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };

        default:
            return state;
    }
};