import {AuthProvider} from '@/app/providers/auth-provider';
import {HttpStateService} from '@/app/utils/http-state';
import {Screen} from '@/app/utils/screen';
import {runZodValidation} from '@/app/utils/zod-validation';
import {Component, effect, inject, input, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Fingerprint from '@fingerprintjs/fingerprintjs';
import {LoginMfa as MfaSchema, SecurityService} from '@m1p13/client';
import {loginMfaSchema} from '@m1p13/client/zod';
import {ToastrService} from 'ngx-toastr';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {InputOtpModule} from 'primeng/inputotp';

@Component({
  selector: 'verify-email',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputOtpModule,
    DividerModule,
  ],
  templateUrl: './verify-email.html',
})
export class VerifyEmail {
  token = input.required<string>();
  private redirectTo = signal('profile');
  private toast = inject(ToastrService);
  private securityService = inject(SecurityService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private screen = inject(Screen);
  private authProvider = inject(AuthProvider);

  constructor() {
    effect(() => {
      this.authProvider.setToken(this.token());
      this.redirectTo.set(
        this.route.snapshot.queryParamMap.get('redirectTo') || 'profile'
      );
    });
  }

  mfaState = new HttpStateService();
  form = this.formBuilder.group<MfaSchema>({
    code: '',
    fingerprint: '',
  });

  zodErrors = signal<Record<string, string | null>>({});

  get screenService() {
    return this.screen;
  }

  async getFingerprint() {
    const fp = await Fingerprint.load();
    const result = await fp.get();
    return result.visitorId;
  }

  async submit() {
    this.form.markAllAsTouched();

    const parsedValue = runZodValidation(
      this.form.value,
      loginMfaSchema,
      this.zodErrors
    );

    if (!parsedValue.success) return;
    const fingerprint = await this.getFingerprint();

    this.mfaState.request({
      request: this.securityService.loginMfa({
        ...parsedValue.data,
        fingerprint,
      }),
      onSuccess: () => {
        if (this.redirectTo() == 'profile') {
          this.toast.success('Bienvenue');
          this.router.navigate(['/profile']);
          return;
        }
        this.toast.success('Encore une étape');
        this.router.navigate([`/password/${this.token()}`]);
      },
    });
  }
}
