import {AuthProvider} from '@/app/providers/auth-provider';
import {HttpStateService} from '@/app/utils/http-state';
import {Screen} from '@/app/utils/screen';
import {runZodValidation} from '@/app/utils/zod-validation';
import {Component, effect, inject, input, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '@m1p13mean-sarobidy-faliana/client';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import z from 'zod';

const passwordSchema = z
  .object({
    password: z.string().min(6),
    confirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmation, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmation'],
  });

type PasswordSchema = z.infer<typeof passwordSchema>;

@Component({
  selector: 'confirm-password',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    FloatLabelModule,
    CardModule,
  ],
  templateUrl: './confirm-password.html',
})
export class ConfirmPassword {
  private authProvider = inject(AuthProvider);
  private securityService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private screen = inject(Screen);
  token = input.required<string>();
  resetPasswordState = inject(HttpStateService);

  constructor() {
    effect(() => {
      this.authProvider.setToken({
        accessToken: this.token(),
        refresshToken: '',
      });
    });
  }

  zodErrors = signal<Record<string, string | null>>({});

  form = this.formBuilder.group<PasswordSchema>({
    password: '',
    confirmation: '',
  });

  get screenService() {
    return this.screen;
  }

  async submit() {
    this.form.markAllAsTouched();

    const parsedValue = runZodValidation(
      this.form.value,
      passwordSchema,
      this.zodErrors
    );

    if (parsedValue.error) return;

    await this.resetPasswordState.request({
      request: this.securityService.resetPassword(this.token(), {
        confirmPassword: parsedValue.data?.confirmation,
        password: parsedValue.data?.password,
      }),
    });
  }
}
