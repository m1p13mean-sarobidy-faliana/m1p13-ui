import {LoginMfa} from '@/app/components';
import {HttpStateService} from '@/app/utils/http-state';
import {Screen} from '@/app/utils/screen';
import {runZodValidation} from '@/app/utils/zod-validation';
import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Login as LoginSchema, SecurityService} from '@m1p13/client';
import {loginSchema} from '@m1p13/client/zod';
import {ToastrService} from 'ngx-toastr';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {StepperModule} from 'primeng/stepper';

@Component({
  selector: 'login-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    CardModule,
    DividerModule,
    LoginMfa,
    StepperModule,
  ],
  templateUrl: './login.html',
})
export class Login {
  private toast = inject(ToastrService);
  private securityService = inject(SecurityService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  activePanel = signal(1);
  email = signal('');

  screen = inject(Screen);
  loginState = new HttpStateService();
  form = this.formBuilder.group<LoginSchema>({
    email: '',
    password: '',
  });

  zodErrors = signal<Record<string, string | null>>({});

  activatePanel = (val: number) => {
    this.activePanel.set(val);
  };

  submit() {
    this.form.markAllAsTouched();

    const parsedValue = runZodValidation(
      this.form.value,
      loginSchema,
      this.zodErrors
    );

    if (!parsedValue.success) return;
    this.loginState.request({
      request: this.securityService.login(parsedValue.data),
      onSuccess: () => {
        this.toast.success('Vous y ête presque');
        this.activatePanel(2);
        this.email.set(parsedValue.data.email);
      },
    });
  }
}
