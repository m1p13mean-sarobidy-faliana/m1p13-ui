import {AuthProvider} from '@/app/providers/auth-provider';
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
import {InputGroupModule} from 'primeng/inputgroup';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {PopoverModule} from 'primeng/popover';
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
    StepperModule,
    PopoverModule,
    InputGroupModule,
  ],
  templateUrl: './login.html',
})
export class Login {
  private toast = inject(ToastrService);
  private securityService = inject(SecurityService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authProvider = inject(AuthProvider);
  loginState = inject(HttpStateService);
  sendEmailState = inject(HttpStateService);
  email = signal('');

  screen = inject(Screen);
  form = this.formBuilder.group<LoginSchema>({
    email: '',
    password: '',
  });

  zodErrors = signal<Record<string, string | null>>({});

  submit() {
    this.form.markAllAsTouched();

    const parsedValue = runZodValidation(
      this.form.value,
      loginSchema,
      this.zodErrors
    );

    if (!parsedValue.success) return;
    // this.loginState.request({
    //   request: this.securityService.login(parsedValue.data),
    //   onSuccess: () => {
    //     this.toast.success('Vous y ête presque');
    //     this.toast.success('Un email vous a été envoyé');
    //     //TODO: backend can send temporary token for the frontend otp validation
    //     this.form.reset();
    //   },
    // });
    this.authProvider.setUser({
      id: '',
      first_name: 'Fanomezana Sarobidy',
      last_name: 'RAKOTOMAHEFA',
      email: '',
      phone: '034 76 184 52',
      address: '',
      role: 'MANAGER',
      status: 'VALID',
    });
    this.authProvider.setToken('token');
    this.router.navigate(['/dashboard']);
  }

  forgotPassword() {
    //TODO: sendEmail

    this.router.navigate(['/verify-email/token'], {
      queryParams: {redirectTo: 'password'},
    });
  }
}
