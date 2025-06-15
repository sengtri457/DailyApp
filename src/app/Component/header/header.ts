import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../services/expense';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  valueForm: string = ''; // Form values are strings
  result: number = 0;
  totalSpendTitle: string = "Today's Spend: ";
  Alphabet: string = 'a';
  total = inject(Expense);

  totl1(): void {
    const numericValue = parseFloat(this.valueForm) || 0; // safely convert to number
    this.result += this.total.total + numericValue;
    if (this.valueForm.includes(this.Alphabet)) {
      alert('Please Input int');
    }
    this.valueForm = '';
  }
}
