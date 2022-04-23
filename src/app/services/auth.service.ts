import { Injectable } from '@angular/core';
import { AuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private googleProvider: AuthProvider;

  constructor(private afAuth: AngularFireAuth) {
    this.googleProvider = new GoogleAuthProvider();
  }

  async isAuthenticated(): Promise<boolean> {
    return this.afAuth.authState.pipe(
      map(st => !!st),
      first(),
    ).toPromise();
  }

  get currentUser$(): Observable<User | undefined> {
    return this.afAuth.authState.pipe(
      map(user => {
        if (!user) { return undefined };
        const { displayName, email, photoURL } = user;
        return { displayName, email, photoURL };
      })
    );
  }

  public async signIn() {
    await this.afAuth.signInWithRedirect(this.googleProvider);
  }

  public async signOut() {
    await this.afAuth.signOut();
  }
}
