import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../services/expense';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  ValueForm = '';

  total = inject(Expense);
  totl1() {
    this.total.total + this.ValueForm;
  }
  ngOnInit(): void {
    this.totl1();
  }
}
