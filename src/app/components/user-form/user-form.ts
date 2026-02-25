import {runZodValidation} from '@/app/utils/zod-validation';
import {Component, inject, Input, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {User} from '@m1p13/client';
import {userSchema} from '@m1p13/client/zod';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';
import {v4 as uuid} from 'uuid';

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
  private formBuilder = inject(FormBuilder);

  userForm = this.formBuilder.group<User>({
    id: this.id || uuid(),
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    role: 'CUSTOMER',
    status: 'WAITING',
  });

  zodErrors = signal<Record<string, string | null>>({});

  submit() {
    this.userForm.markAllAsTouched();

    const parsedValue = runZodValidation(
      this.userForm.value,
      userSchema,
      this.zodErrors
    );
  }
}
