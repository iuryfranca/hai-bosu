import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginEndRegisterPageRoutingModule } from './login-end-register-routing.module';

import { LoginEndRegisterPage } from './login-end-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginEndRegisterPageRoutingModule
  ],
  declarations: [LoginEndRegisterPage]
})
export class LoginEndRegisterPageModule {}
