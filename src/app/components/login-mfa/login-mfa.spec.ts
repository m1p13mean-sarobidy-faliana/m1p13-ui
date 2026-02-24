import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginMfa} from './login-mfa';

describe('LoginMfa', () => {
  let component: LoginMfa;
  let fixture: ComponentFixture<LoginMfa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginMfa],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginMfa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
