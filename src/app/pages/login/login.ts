import {AuthProvider} from '@/app/providers/auth-provider';
import {HttpStateService} from '@/app/utils/http-state';
import {Screen} from '@/app/utils/screen';
import {runZodValidation} from '@/app/utils/zod-validation';
import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {
  AuthService,
  Login200Response,
  LoginInput,
  Whoami200Response,
} from '@m1p13mean-sarobidy-faliana/client';
import {loginInputSchema} from '@m1p13mean-sarobidy-faliana/client/zod';
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
  private securityService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authProvider = inject(AuthProvider);
  loginState = inject(HttpStateService);
  whoamiState = inject(HttpStateService);
  sendEmailState = inject(HttpStateService);
  email = signal('');

  screen = inject(Screen);
  form = this.formBuilder.group<LoginInput>({
    email: '',
    password: '',
  });

  zodErrors = signal<Record<string, string | null>>({});

  async submit() {
    this.form.markAllAsTouched();

    const parsedValue = runZodValidation(
      this.form.value,
      loginInputSchema,
      this.zodErrors
    );

    if (!parsedValue.success) return;
    await this.loginState.request({
      request: this.securityService.login(parsedValue.data),
      onSuccess: (response: Login200Response) => {
        this.authProvider.setToken({
          accessToken: response.data?.accessToken || '',
          refresshToken: response.data?.refreshToken || '',
        });
      },
    });
    await this.whoamiState.request({
      request: this.securityService.whoami(),
      onSuccess: (whoami: Whoami200Response) => {
        this.toast.success('Vous y ête presque');
        this.toast.success('Un email vous a été envoyé');
        this.authProvider.setUser(whoami.data!);
        // this.router.navigate(
        //   [`/verify-email/${this.authProvider.getToken() || ''}`],
        //   {queryParams: {redirectTo: 'profile'}}
        // );
        this.form.reset();
        this.router.navigate(['/dashboard']);
      },
    });
  }

  forgotPassword() {
    this.securityService.forgotPassword({email: this.form.value.email!});
    this.router.navigate(['/verify-email/token'], {
      queryParams: {redirectTo: 'password'},
    });
  }
}
