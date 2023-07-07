import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginEndRegisterPage } from './login-end-register.page';

describe('LoginEndRegisterPage', () => {
  let component: LoginEndRegisterPage;
  let fixture: ComponentFixture<LoginEndRegisterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginEndRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
