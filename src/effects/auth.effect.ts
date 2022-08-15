import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthAction from 'src/actions/auth.actions';
import { AuthService } from "src/app/services/auth.service";
import { map, switchMap,catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable() 
export class AuthEffects {
    constructor(private actions$: Actions,private authService: AuthService) {}

    authEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AuthAction.login),
        switchMap(() => this.authService.login()),
        map(idToken => AuthAction.loginSuccess({idToken: idToken})),
        catchError(error => of(AuthAction.loginFail({error: error})))
    ));
}