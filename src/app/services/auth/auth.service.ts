import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  User,
  signInWithCredential,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { AlertController, isPlatform } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { environment } from '@environment/environment';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { IFoods } from '../foods/foods.service';
import { ICart } from '../cart/cart.service';

export interface IUser {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  photoURL: string;
  favorites: IFoods[];
  cart: ICart[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firestoreRef = getFirestore(initializeApp(environment.firebase));
  public userAuth: IUser;

  constructor(private auth: Auth, private alertController: AlertController) {
    this.initializeApp();
  }

  async initializeApp() {
    if (!isPlatform('capacitor')) {
      console.log('Platform -> [capacitor]');
      GoogleAuth.initialize();
    }

    if (sessionStorage.getItem('userAuth')) {
      this.userAuth = JSON.parse(sessionStorage.getItem('userAuth'));
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Ok'],
    });
    await alert.present();
  }

  async getUserById(id: string) {
    const documentRef = doc(this.firestoreRef, 'users', id);

    return await getDoc(documentRef).then((doc) => {
      return doc.data();
    });
  }

  async setUserDoc(user: User) {
    await setDoc(doc(this.firestoreRef, 'users', user.uid), {
      uid: user?.uid,
      admin: user?.email,
      displayName: user?.displayName,
      email: user?.email,
      emailVerified: user?.emailVerified,
      phoneNumber: user?.phoneNumber,
      photoURL: user?.photoURL,
      favorites: [],
      orders: [],
      cart: [],
    })
      .then(() => {
        this.showAlert(
          'Successfully login user',
          `Welcome ${user?.displayName}!`
        );
      })
      .catch((error) => {
        console.log('Error ->', error);
        this.showAlert(
          'Registration in failed',
          'Please try again. | ' + error.message
        );
      });
  }

  async register(email: string, password: string, displayName: string) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      )
        .then(async (data) => {
          await updateProfile(data.user, {
            displayName: displayName,
          }).then(async () => {
            await this.setUserDoc({
              ...data.user,
              displayName: displayName,
            });
          });
        })
        .catch((error) => {
          console.log('Error ->', error);

          this.showAlert(
            'Registration in failed',
            'Please try again. | ' + error.message
          );
        });

      return user;
    } catch (error) {
      console.log('Error ->', error);
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      const data = await signInWithEmailAndPassword(this.auth, email, password);
      this.showAlert(
        'Successfully registered user',
        `Welcome ${data?.user.displayName}!`
      );

      this.userAuth = (await this.getUserById(data?.user.uid)) as IUser;
      sessionStorage.setItem('userAuth', JSON.stringify(this.userAuth));

      return data?.user;
    } catch (error) {
      console.log('Error ->', error);
      return null;
    }
  }

  async loginWithGoogle() {
    try {
      let googleUser = await GoogleAuth.signIn();
      const credential = await GoogleAuthProvider.credential(
        googleUser.authentication.idToken
      );

      const data = await signInWithCredential(this.auth, credential);

      this.userAuth = (await this.getUserById(data?.user.uid)) as IUser;
      sessionStorage.setItem('userAuth', JSON.stringify(this.userAuth));

      await this.setUserDoc(data.user);

      return data.user;
    } catch (error) {
      console.log('Error ->', error);
      return null;
    }
  }

  async logout() {
    try {
      sessionStorage.clear();
      await this.auth.signOut();
    } catch (error) {
      console.log('Error ->', error);
    }
  }
}
