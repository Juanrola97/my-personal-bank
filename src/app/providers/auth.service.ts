import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return angularFirestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.angularFireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.error('Error => ' + error);
    }
  }
  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.angularFireAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.error('Error => ' + error);
    }
  }
  async register(email: string, password: string): Promise<User> {
    try {
      const {
        user,
      } = await this.angularFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.error('Error => ' + error);
    }
  }
  async logout(): Promise<void> {
    try {
      await this.angularFireAuth.signOut();
    } catch (error) {
      console.error('Error => ' + error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.angularFireAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.error('Error => ' + error);
    }
  }
  async resetPassword(email: string): Promise<User> {
    try {
      return this.angularFireAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Error => ' + error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };
    return userRef.set(data, { merge: true });
  }
}
