import { createAction,props } from '@ngrx/store';
import {AuthState} from 'src/states/auth.state';
 
export const login = createAction('[Auth] Login');
export const loginSuccess = createAction('[Auth] Login Success', props<{ idToken: string }>());
export const loginFail = createAction('[Auth] Login Failed', props<{ error: string }>());
export const logOut = createAction('[Auth] Logout');