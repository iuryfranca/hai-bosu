import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(
      this.email!.value,
      this.password!.value
    );
    await loading.dismiss();

    if (user) {
      this, this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.showAlert('Login in failed', 'Please try again.');
    }
  }

  async googleLogin() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.loginWithGoogle();
    console.log('USER TELA LOGIN --> ', user);
    await loading.dismiss();

    if (user) {
      this, this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.showAlert('Login in failed', 'Please try again.');
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
