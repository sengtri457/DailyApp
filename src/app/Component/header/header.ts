import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';

@Component({
  selector: 'app-header',
  imports: [NgChartsModule, CommonModule, ExpenseFormComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  
  private expenseService = inject(ExpenseService);
  
  expenses = this.expenseService.expenses;
  summary = computed(() => this.expenseService.getExpenseSummary());

  // Pie chart configuration
  pieChartData = computed<ChartData<'pie', number[], string | string[]>>(() => {
    const summary = this.summary();
    const categories = Object.keys(summary.totalByCategory);
    const values = Object.values(summary.totalByCategory);
    
    return {
      labels: categories.length > 0 ? categories : ['No Data'],
      datasets: [{
        data: values.length > 0 ? values : [1],
        backgroundColor: [
          '#FF6384',
          '#36A2EB', 
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }]
    };
  });

  pieChartType: ChartType = 'pie';
  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  ngOnInit(): void {
    // Initialization is handled by the service
  }

  clearExpenses(): void {
    if (confirm('Are you sure you want to clear all expenses?')) {
      this.expenseService.clearAllExpenses();
    }
  }

  getTotalInUSD(): number {
    return this.expenseService.convertCurrency(this.summary().totalExpenses, 'KHR', 'USD');
  }
}