import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-end-register',
  templateUrl: './login-end-register.page.html',
  styleUrls: ['./login-end-register.page.scss'],
})
export class LoginEndRegisterPage implements OnInit {
  segmentModel = 'login';

  constructor() {}

  ngOnInit() {}

  segmentChanged($event: Event) {
    console.log($event);
  }
}
