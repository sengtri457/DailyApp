import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './Component/header/header';
import { Main } from './Component/main/main';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Main, CommonModule, NgChartsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'DailyApp';
}
