import {UserForm} from '@/app/components';
import {Screen} from '@/app/utils/screen';
import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {StepperModule} from 'primeng/stepper';
@Component({
  selector: 'register',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    CardModule,
    DividerModule,
    StepperModule,
    UserForm,
  ],
  templateUrl: './register.html',
})
export class Register {
  private router = inject(Router);
  screen = inject(Screen);

  redirectAfterSuccess(token: string) {
    this.router.navigate([`/verify-email/${token}`]);
  }
}
