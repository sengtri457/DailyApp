import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../services/expense';
import { TypeCategories } from '../../Models/Category';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface ExpenseEntry {
  category: string;
  unitValue: number; // valueForm
  qty: number; // QtyResult
  totalDollar: number; // unitValue * qty
  totalReal: number; // totalDollar * FormatCurrency
  timestamp: string;
}
@Component({
  selector: 'app-header',
  imports: [FormsModule, NgChartsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
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
  CatchSelected: string = '';
  GetIncrementeNumber = signal<number>(0);
  expenses: ExpenseEntry[] = [];
  GetDollor: number = 0;

  ngOnInit(): void {
    if (this.isBrowser) {
      const raw = localStorage.getItem('expenses');
      this.expenses = raw ? JSON.parse(raw) : [];
      this.Managementategory.set(this.GetItems);
    }
  }
  clearExpenses() {
    if (this.isBrowser) {
      localStorage.removeItem('expenses'); // or localStorage.clear() if you want everything
      this.expenses = [];
    }
  }

  totalReal() {
    const numericValueReal = parseFloat(this.ValueReal) || 0;
    this.resultReal += numericValueReal * this.QtyResult() + this.total.total;
    this.result = this.resultReal / this.FormatCurrency;
    if (this.ValueReal.includes(this.Alphabet)) {
      alert('Please Input int');
    }
    this.ValueReal = '';
    this.ConstGetItem = numericValueReal;
    this.CatchSelected = this.selectedCategory;
    this.selectedCategory = '';
    console.log(this.CatchSelected);
    if (this.ValueReal.match(/[^\d.]/)) {
      alert('Please input a valid number');
      return;
    }
    // build an entry
    const entry: ExpenseEntry = {
      category: this.CatchSelected || '—',
      unitValue: this.ConstGetItem,
      qty: this.QtyResult(),
      totalDollar: this.result,
      totalReal: this.resultReal,
      timestamp: new Date().toISOString(),
    };
    // store it
    this.expenses.push(entry);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));

    // clear form
    this.valueForm = '';
    // if (this.isBrowser) {
    //   this.expenses.push(entry);
    //   localStorage.setItem('expenses', JSON.stringify(this.expenses));
    // }
    this.GetIncrementeNumber.set(0);
    console.log(this.QtyResult);
    console.log('saved', entry);
    console.log(this.expenses.length);
  }

  increment() {
    this.QtyResult() >= 0 ? this.QtyResult.update((up: number) => up + 1) : 0;
    this.QtyResult() > this.MaxQty ? this.QtyResult.set(this.MaxQty) : 0;
    this.GetIncrementeNumber() >= 0
      ? this.GetIncrementeNumber.update((up: number) => up + 1)
      : 0;
    this.GetIncrementeNumber() > this.MaxQty
      ? this.GetIncrementeNumber.set(this.MaxQty)
      : 0;
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
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Food', 'Transport', 'Utilities'],
    datasets: [
      {
        data: [
          this.GetItems[0]?.price || 0,
          this.GetItems[1]?.price || 0,
          this.GetItems[2]?.price || 0,
        ],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
      },
    ],
  };

  pieChartType: ChartType = 'pie';
  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
}
