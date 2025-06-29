import { Injectable, signal } from '@angular/core';
import { ExpenseEntry, ExpenseSummary } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly STORAGE_KEY = 'daily-expenses';
  private readonly USD_TO_KHR_RATE = 4100;

  expenses = signal<ExpenseEntry[]>([]);

  constructor() {
    this.loadExpenses();
  }

  addExpense(category: string, unitPrice: number, quantity: number, currency: 'USD' | 'KHR' = 'KHR'): void {
    if (!category || unitPrice <= 0 || quantity <= 0) {
      throw new Error('Invalid expense data');
    }

    const totalAmount = unitPrice * quantity;
    
    const expense: ExpenseEntry = {
      id: this.generateId(),
      category: category.toLowerCase(),
      unitPrice,
      quantity,
      totalAmount,
      currency,
      timestamp: new Date()
    };

    this.expenses.update(expenses => [...expenses, expense]);
    this.saveExpenses();
  }

  removeExpense(id: string): void {
    this.expenses.update(expenses => expenses.filter(exp => exp.id !== id));
    this.saveExpenses();
  }

  clearAllExpenses(): void {
    this.expenses.set([]);
    this.saveExpenses();
  }

  getExpenseSummary(): ExpenseSummary {
    const expenses = this.expenses();
    
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.totalAmount, 0);
    const totalItems = expenses.reduce((sum, exp) => sum + exp.quantity, 0);
    
    const totalByCategory = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalExpenses,
      totalByCategory,
      totalItems
    };
  }

  convertCurrency(amount: number, from: 'USD' | 'KHR', to: 'USD' | 'KHR'): number {
    if (from === to) return amount;
    
    if (from === 'USD' && to === 'KHR') {
      return amount * this.USD_TO_KHR_RATE;
    } else if (from === 'KHR' && to === 'USD') {
      return amount / this.USD_TO_KHR_RATE;
    }
    
    return amount;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private loadExpenses(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const expenses = JSON.parse(stored).map((exp: any) => ({
          ...exp,
          timestamp: new Date(exp.timestamp)
        }));
        this.expenses.set(expenses);
      }
    } catch (error) {
      console.error('Failed to load expenses:', error);
    }
  }

  private saveExpenses(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.expenses()));
    } catch (error) {
      console.error('Failed to save expenses:', error);
    }
  }
}