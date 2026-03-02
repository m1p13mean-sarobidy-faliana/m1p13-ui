import {runZodValidation} from '@/app/utils/zod-validation';
import {Component, inject, Input, signal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Catalog, Shop} from '@m1p13/client';
import {catalogSchema} from '@m1p13/client/zod';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';
@Component({
  selector: 'catalog-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    SelectModule,
    InputNumberModule,
    AutoCompleteModule,
  ],
  templateUrl: './catalog-form.html',
})
export class CatalogForm {
  @Input() catalog?: Catalog;

  constructor() {
    if (this.catalog) {
      console.log(this.catalog);
    }
  }
  private formBuilder = inject(FormBuilder);
  categories = [{name: 'Technologie'}, {name: 'Audio'}, {name: 'Jeux'}];
  catalogForm = this.formBuilder.group<Catalog>({
    id: '',
    name: '',
    unit_price: '',
    category: undefined,
    description: '',
    shop: {
      id: '',
      name: '',
      description: '',
    },
  });

  shopLists: Shop[] = [
    {
      id: 'shopId',
      name: 'My shop',
      description: '',
    },
    {
      id: 'shopId2',
      name: 'other shop',
      description: '',
    },
  ];
  suggestions: any[] = [];
  search(event: any) {
    this.suggestions = [...this.shopLists];
  }
  zodErrors = signal<Record<string, string | null>>({});

  submit() {
    this.catalogForm.markAllAsTouched();

    const parsedValue = runZodValidation(
      this.catalogForm.value,
      catalogSchema,
      this.zodErrors
    );
  }
}
