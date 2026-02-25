import {AuthProvider} from '@/app/providers/auth-provider';
import {Screen} from '@/app/utils/screen';
import {runZodValidation} from '@/app/utils/zod-validation';
import {Component, effect, inject, input, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
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
  private formBuilder = inject(FormBuilder);
  private screen = inject(Screen);
  token = input.required<string>();

  constructor() {
    effect(() => {
      this.authProvider.setToken(this.token());
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

  submit() {
    this.form.markAllAsTouched();
    const parsedValue = runZodValidation(
      this.form.value,
      passwordSchema,
      this.zodErrors
    );
  }
}
