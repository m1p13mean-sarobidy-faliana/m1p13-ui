import {AuthProvider} from '@/app/providers/auth-provider';
import {Component, computed, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {StepperModule} from 'primeng/stepper';
import {TableModule} from 'primeng/table';
import {CartService} from './cart-service';

@Component({
  selector: 'cart',
  imports: [
    InputNumberModule,
    ButtonModule,
    StepperModule,
    TableModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    InputMaskModule,
    RadioButtonModule,
    StepperModule,
    IconField,
    InputIcon,
  ],
  templateUrl: './cart.html',
})
export class Cart {
  authProvider = inject(AuthProvider);
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    username: [this.authProvider.currentUser()?.first_name || ''],
    phone: [this.authProvider.currentUser()?.phone || ''],
    location: [''],
  });

  cartService = inject(CartService);
  paymentMethod: string = 'counter';

  submit() {
    this.form.markAllAsTouched();
    console.log(this.cartService.getGroupedOrders());
  }
}
