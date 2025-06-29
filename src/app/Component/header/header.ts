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
  GTotal: number;
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
  GrandTotal: number = 0;
  DetectedMessange: boolean = false;
  MessangePie = signal('Data is Availabel');
  // Pie chart data
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Grand Total'],
    datasets: [
      {
        data: [0],
        backgroundColor: ['#36a2eb'],
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
  updatePieChart() {
    // Sum all qty and totalReal from expenses
    const totalQty = this.expenses.reduce(
      (sum, entry) => sum + (entry.qty ?? 0),
      0
    );
    const totalReal = this.expenses.reduce(
      (sum, entry) => sum + (entry.totalReal ?? 0),
      0
    );
    // Update the pie chart data
    this.pieChartData.datasets[0].data = [totalQty, totalReal];
    if (totalQty !== 0) {
      this.DetectedMessange = true;
    } else {
      this.DetectedMessange = false;
      alert('No Data To Display');
    }
  }
  ngOnInit(): void {
    if (this.isBrowser) {
      const raw = localStorage.getItem('expenses');
      this.expenses = raw ? JSON.parse(raw) : [];
      this.Managementategory.set(this.GetItems);
      this.DetectedMessange = true;
      this.updatePieChart();
    }
  }

  // Call this whenever you want to update the pie chart

  // Detect input changes and update pie chart
  onValueInputChange() {
    this.updatePieChart();
  }

  CheckIsTrue() {
    return this.DetectedMessange ? 'Data Is Avai' : 'No data';
  }

  clearExpenses() {
    if (this.isBrowser) {
      localStorage.removeItem('expenses');
      this.expenses = [];
      if (this.updatePieChart) {
        alert('Data was Clear All');
        this.updatePieChart();
        this.DetectedMessange = false;
      }
    }
  }

  totalReal() {
    if (this.GetIncrementeNumber()) {
      const numericValueReal = parseFloat(this.ValueReal) || 0;
      if (numericValueReal > 0 && this.selectedCategory != '') {
        this.resultReal +=
          numericValueReal * this.QtyResult() + this.total.total;
        this.result = this.resultReal / this.FormatCurrency;
        this.GrandTotal += this.resultReal;
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
          GTotal: this.GrandTotal,
          timestamp: new Date().toISOString(),
        };
        const GetTotal = this.GrandTotal + this.resultReal;
        console.log(GetTotal);
        // store it
        this.expenses.push(entry);
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
        // clear form
        this.valueForm = '';
        this.GetIncrementeNumber.set(0);
        console.log(this.GrandTotal);
        this.DetectedMessange = true;
        if ((this.DetectedMessange = true)) {
          this.updatePieChart();
        }
      } else {
        alert('Please Fill The Requirement');
      }
    } else {
      alert('Please Fill The Requirement');
    }
  }

  GrandTotalImpiment() {
    return this.expenses.reduce((sum, crr) => sum + (crr.totalReal ?? 0), 0);
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
    this.updatePieChart();
    console.log(this.result, this.resultReal);
  }
  decrement() {
    this.QtyResult() > 0 ? this.QtyResult.update((up: number) => up - 1) : 0;
    this.GetIncrementeNumber() > 0
      ? this.GetIncrementeNumber.update((up: number) => up - 1)
      : 0;
    this.GetIncrementeNumber() > this.MaxQty
      ? this.GetIncrementeNumber.set(this.MaxQty)
      : 0;
    if (this.result && this.resultReal) {
      this.result--;
      this.resultReal -= this.FormatCurrency;
    }
    this.updatePieChart();
  }
}
