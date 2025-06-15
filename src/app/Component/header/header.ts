import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../services/expense';
import { TypeCategories } from '../../Models/Category';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  valueForm: string = '';
  ValueReal: string = '';
  result: number = 0;
  resultReal: number = 0;
  totalSpendTitle: string = 'Total Dollar:$ ';
  totalSpendTitleReal: string = 'Total Real:៛ ';
  Alphabet: string = 'a';
  TitleQty: string = 'QTY';
  FormatCurrency: number = 4100;
  total = inject(Expense);
  Managementategory = signal<Array<TypeCategories>>([]);
  GetItems = this.total.ManagementType;
  selectedCategory: string = '';
  QtyResult = signal<number>(0);
  MaxQty: number = 10;
  ConstGetItem: number = 0;

  totl1(): void {
    const numericValue = parseFloat(this.valueForm) || 0; // safely convert to number
    this.result += numericValue * this.QtyResult() + this.total.total;
    this.resultReal = this.result * this.FormatCurrency;
    if (this.valueForm.includes(this.Alphabet)) {
      alert('Please Input int');
    }
    this.valueForm = '';
    this.ConstGetItem = numericValue;
    console.log(numericValue);
  }
  totalReal() {
    const numericValueReal = parseFloat(this.ValueReal) || 0;
    this.resultReal += numericValueReal * this.QtyResult() + this.total.total;
    this.result = this.resultReal / 4100;
    if (this.ValueReal.includes(this.Alphabet)) {
      alert('Please Input int');
    }
    this.ValueReal = '';
    console.log(numericValueReal);
    this.ConstGetItem = numericValueReal;
  }

  increment() {
    this.QtyResult() >= 0 ? this.QtyResult.update((up: number) => up + 1) : 0;
    this.QtyResult() > this.MaxQty ? this.QtyResult.set(this.MaxQty) : 0;
    if (this.result && this.resultReal) {
      this.result++;
      this.resultReal += this.FormatCurrency;
    }
    console.log(this.result, this.resultReal);
  }
  decrement() {
    this.QtyResult() > 0 ? this.QtyResult.update((up: number) => up - 1) : 0;
    if (this.result && this.resultReal) {
      this.result--;
      this.resultReal -= this.FormatCurrency;
    }
  }

  ngOnInit(): void {
    this.Managementategory.set(this.GetItems);
  }
}
