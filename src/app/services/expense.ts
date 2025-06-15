import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeCategories } from '../Models/Category';
@Injectable({
  providedIn: 'root',
})
export class Expense {
  http = inject(HttpClient);
  total: number = 0;
  ManagementType: Array<TypeCategories> = [
    {
      id: 1,
      categoryName: 'Coffee',
      price: 1,
    },
    {
      id: 2,
      categoryName: 'Food',
      price: 1.5,
    },
    {
      id: 3,
      categoryName: 'Other',
      price: 12,
    },
  ];

  constructor() {}
}
