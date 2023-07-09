import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firestoreRef = inject(Firestore);

  constructor(private auth: Auth, private alertController: AlertController) {}

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
        .then((user) => {
          const collectionRef = collection(this.firestoreRef, 'users');
          addDoc(collectionRef, { ...user, id: user?.user?.uid }).then(() => {
            this.showAlert(
              'Successfully registered user',
              `Welcome ${user?.user?.displayName}!`
            );
          });
        })
        .catch((error) => {
          this.showAlert('Registration in failed', 'Please try again.');
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
