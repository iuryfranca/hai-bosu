import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login-end-register',
  templateUrl: './login-end-register.page.html',
  styleUrls: ['./login-end-register.page.scss'],
})
export class LoginEndRegisterPage implements OnInit {
  segmentModel = 'login';

  currentRoute: string;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.segmentModel = this.currentRoute.includes('login')
          ? 'login'
          : this.currentRoute.includes('register')
          ? 'register'
          : 'login';
      }
    });
  }

  ngOnInit() {}

  segmentChanged($event: Event) {
    console.log('Mudando de aba', $event);
  }
}
