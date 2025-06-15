import { Component, inject } from '@angular/core';
@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  TotalSpandTitle: string = "Today's Spend: ";
  Total = '';
  constructor() {}
}
