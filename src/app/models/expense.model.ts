export interface ExpenseEntry {
  id: string;
  category: string;
  description?: string;
  unitPrice: number;
  quantity: number;
  totalAmount: number;
  currency: 'USD' | 'KHR';
  timestamp: Date;
}

export interface ExpenseSummary {
  totalExpenses: number;
  totalByCategory: Record<string, number>;
  totalItems: number;
}