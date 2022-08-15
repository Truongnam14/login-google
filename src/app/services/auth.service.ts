import { Injectable } from '@angular/core';
import { Auth,GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { async, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }

  login() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        let credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
        let idToken = await credential.user.getIdToken();
        resolve(idToken);
      }
      catch {
        reject();
      }
    });
  }
  logout() {
    this.auth.signOut();
  }
}