import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './Component/header/header';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule, NgChartsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'DailyApp';
}
