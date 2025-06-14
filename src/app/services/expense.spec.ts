import { TestBed } from '@angular/core/testing';

import { Expense } from './expense';

describe('Expense', () => {
  let service: Expense;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Expense);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
