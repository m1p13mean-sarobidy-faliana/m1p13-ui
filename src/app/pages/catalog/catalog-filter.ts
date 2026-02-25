// search-filters.component.ts
import {CommonModule} from '@angular/common'; // ← AJOUTÉ ICI
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ChipModule} from 'primeng/chip';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {ListboxModule} from 'primeng/listbox';
import {SliderModule} from 'primeng/slider';

interface Category {
  label: string;
  code: string;
}

@Component({
  selector: 'catalog-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SliderModule,
    ChipModule,
    ButtonModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    ListboxModule,
    AutoCompleteModule,
    CardModule,
  ],
  templateUrl: './catalog-filter.html',
})
export class CatalogFilter {
  categories: Category[] = [
    {label: 'Electronics', code: '1'},
    {label: 'Audio', code: '2'},
    {label: 'Technologie', code: '3'},
  ];
  suggestions: any[] = [];
  selectedCategory!: Category[];
  search(event: any) {
    this.suggestions = [...this.categories];
  }
  searchQuery = '';
  shopSearch = '';
  priceValue = [0, 100];

  shopChips = [{label: 'TechZone'}, {label: 'Official Hub'}];

  removeChip(chip: any) {
    this.shopChips = this.shopChips.filter((c) => c !== chip);
  }

  clearAll() {
    this.searchQuery = '';
    this.shopSearch = '';
    this.priceValue = [0, 100];
    this.shopChips = [];
  }

  applyFilters() {}
}
