import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="expense-form-container">
      <div class="mac-header">
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span>
      </div>
      
      <form (ngSubmit)="onSubmit()" #expenseForm="ngForm" class="p-3">
        <div class="form-group mb-3">
          <input 
            [(ngModel)]="formData.amount" 
            name="amount"
            type="number" 
            step="0.01"
            min="0"
            placeholder="Amount" 
            class="form-control"
            required>
        </div>

        <div class="form-group mb-3">
          <select 
            [(ngModel)]="formData.category" 
            name="category"
            class="form-control"
            required>
            <option value="">Select Category</option>
            <option value="coffee">Coffee</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="quantity-controls mb-3">
          <button type="button" class="btn btn-outline-secondary" (click)="decrementQuantity()">-</button>
          <span class="quantity-display">{{ formData.quantity }}</span>
          <button type="button" class="btn btn-outline-secondary" (click)="incrementQuantity()">+</button>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!expenseForm.valid">
            Add Expense
          </button>
          <button type="button" class="btn btn-secondary" (click)="resetForm()">
            Reset
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .expense-form-container {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .quantity-display {
      font-size: 1.2rem;
      font-weight: bold;
      min-width: 2rem;
      text-align: center;
    }

    .form-actions {
      display: flex;
      gap: 0.5rem;
    }

    .mac-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px;
      background-color: #f8f9fa;
    }

    .mac-header span {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .red { background-color: #ff5f57; }
    .yellow { background-color: #ffbd2e; }
    .green { background-color: #28c941; }
  `]
})
export class ExpenseFormComponent {
  formData = signal({
    amount: 0,
    category: '',
    quantity: 1
  });

  constructor(private expenseService: ExpenseService) {}

  incrementQuantity(): void {
    this.formData.update(data => ({
      ...data,
      quantity: Math.min(data.quantity + 1, 99)
    }));
  }

  decrementQuantity(): void {
    this.formData.update(data => ({
      ...data,
      quantity: Math.max(data.quantity - 1, 1)
    }));
  }

  onSubmit(): void {
    const data = this.formData();
    
    try {
      this.expenseService.addExpense(
        data.category,
        data.amount,
        data.quantity,
        'KHR'
      );
      this.resetForm();
    } catch (error) {
      alert('Error adding expense: ' + (error as Error).message);
    }
  }

  resetForm(): void {
    this.formData.set({
      amount: 0,
      category: '',
      quantity: 1
    });
  }
}