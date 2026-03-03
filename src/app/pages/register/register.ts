import {UserForm} from '@/app/components';
import {HttpStateService} from '@/app/utils/http-state';
import {Screen} from '@/app/utils/screen';
import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '@m1p13mean-sarobidy-faliana/client';
import {ToastrService} from 'ngx-toastr';
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
  private toast = inject(ToastrService);
  private securityService = inject(AuthService);
  forgotPasswordState = inject(HttpStateService);

  async redirectAfterSuccess({token, email}: {token: string; email: string}) {
    //this.router.navigate([`/password/${token}`]);

    await this.forgotPasswordState.request({
      request: this.securityService.forgotPassword({email: email}),
      onSuccess: () => {
        this.toast.success('Un email vous a été envoyé.');
      },
    });
  }
}
