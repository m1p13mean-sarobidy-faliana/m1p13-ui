import {AuthProvider} from '@/app/providers/auth-provider';
import {HttpStateService} from '@/app/utils/http-state';
import {runZodValidation} from '@/app/utils/zod-validation';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import Fingerprint from '@fingerprintjs/fingerprintjs';
import {AuthService, RegisterInput} from '@m1p13mean-sarobidy-faliana/client';
import {registerInputSchema} from '@m1p13mean-sarobidy-faliana/client/zod';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'user-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    DividerModule,
    FloatLabelModule,
    InputTextModule,
    InputMaskModule,
  ],
  templateUrl: './user-form.html',
})
export class UserForm {
  @Input() id?: string;
  @Output() onSuccess = new EventEmitter<{token: string; email: string}>();
  private formBuilder = inject(FormBuilder);
  private authProvider = inject(AuthProvider);
  private securityService = inject(AuthService);
  registerState = inject(HttpStateService);

  async getFingerprint() {
    const fp = await Fingerprint.load();
    const result = await fp.get();
    return result.visitorId;
  }

  // TODO: address and id(for idem potent)
  userForm = this.formBuilder.group<RegisterInput>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role: 'CUSTOMER',
    password: '',
  });

  zodErrors = signal<Record<string, string | null>>({});

  async submit() {
    this.userForm.markAllAsTouched();

    const parsedValue = runZodValidation(
      this.userForm.value,
      registerInputSchema,
      this.zodErrors
    );
    if (!parsedValue.success) return;
    const print = await this.getFingerprint();

    await this.registerState.request({
      request: this.securityService.register({
        ...parsedValue.data,
        password: print,
      }),
      onSuccess: () => {
        this.onSuccess.emit({token: 'token', email: parsedValue.data.email});
      },
    });
  }
}
