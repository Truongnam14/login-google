import { createReducer, on } from "@ngrx/store";
import * as AuthAction from 'src/actions/auth.actions';
import { AuthState } from "src/states/auth.state";

const initialState: AuthState = {
    isAuthenticated: false,
    idToken: '',
    error: ''
}

export const AuthReducer = createReducer(
    on(AuthAction.login, state => state),
    on(AuthAction.loginSuccess, (state, action) => ({
        ...state,
        isAuthenticated: true,
        idToken: action.idToken,
    })),
    on(AuthAction.loginFail, (state, action) => ({
        ...state,
        error: action.error,
    })),
    on(AuthAction.logOut, state => ({
        ...state,
        isAuthenticated: false,
        idToken: '',
    })),

)