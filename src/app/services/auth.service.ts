import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { User } from '@app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;

  constructor(private afAuth: AngularFireAuth) {
    this.authenticated.subscribe(result => {
      this.isAuthenticated = result;
    });
  }

  get authenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(st => st !== null));
  }

  async getUserDetails(): Promise<User | undefined> {
    if (this.isAuthenticated) {
      const { displayName, email, photoURL } = await this.afAuth.authState.pipe(first()).toPromise();
      return {
        displayName,
        email,
        photoURL
      };
    }
  }

  public async signIn() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await this.afAuth.auth.signInWithRedirect(googleProvider);
  }

  public async signOut() {
    await this.afAuth.auth.signOut();
  }
}
