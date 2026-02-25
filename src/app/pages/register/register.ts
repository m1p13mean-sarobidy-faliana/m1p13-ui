import {UserForm} from '@/app/components';
import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
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
export class Register {}
