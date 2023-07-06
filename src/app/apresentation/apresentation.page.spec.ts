import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApresentationPage } from './apresentation.page';

describe('ApresentationPage', () => {
  let component: ApresentationPage;
  let fixture: ComponentFixture<ApresentationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApresentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
