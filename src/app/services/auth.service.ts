import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { AlertController } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firestoreRef = getFirestore(initializeApp(environment.firebase));

  constructor(private auth: Auth, private alertController: AlertController) {}

  async getUserById(id: string) {
    const documentRef = doc(this.firestoreRef, 'users', id);

    return await getDoc(documentRef).then((doc) => {
      return doc.data();
    });
  }

  async login(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (error) {
      console.log('Error ->', error);
      return null;
    }
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
            await setDoc(doc(this.firestoreRef, 'users', data.user.uid), {
              uid: data?.user?.uid,
              admin: data?.user?.email,
              displayName: data?.user?.displayName,
              email: data?.user?.email,
              emailVerified: data?.user?.emailVerified,
              phoneNumber: data?.user?.phoneNumber,
              // photoURL: data.user.photoURL,
              favorites: [],
              orders: [],
            })
              .then(() => {
                this.showAlert(
                  'Successfully registered user',
                  `Welcome ${data?.user?.displayName}!`
                );
              })
              .catch((error) => {
                console.log('Error ->', error);
                this.showAlert(
                  'Registration in failed',
                  'Please try again. | ' + error.message
                );
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

  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.log('Error ->', error);
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
}
