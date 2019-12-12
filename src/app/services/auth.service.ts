import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth"
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.authState = afAuth.authState;
  }

  get state(): Observable<boolean> {
    return this.authState.pipe(map(st => st !== null));
  }

  get isAuthenticated() {
    return this.authState !== null;
  }

  async getUserDetails(): Promise<User | undefined> {
    if (this.isAuthenticated) {
      const { displayName, email } = await this.authState.toPromise();
      return {
        displayName, email
      };
    }
  }

  public async signIn() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const credentials = await this.afAuth.auth.signInWithPopup(googleProvider);
    console.log('Creds: ', credentials);
  }

  public async signOut() {
    await this.afAuth.auth.signOut();
  }
}
