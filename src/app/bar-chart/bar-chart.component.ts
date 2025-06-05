import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  template: `
    <ng-container *ngIf="isBrowser">
      <canvas baseChart
        [data]="barChartData"
        [type]="barChartType"
        [options]="barChartOptions">
      </canvas>
    </ng-container>
  `
})
export class BarChartComponent {
  @Input() data: { [key: string]: number } = {};

  public isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  get barChartData(): ChartConfiguration<'bar'>['data'] {
    return {
      labels: Object.keys(this.data),
      datasets: [
        {
          data: Object.values(this.data),
          label: 'Candidatos',
          backgroundColor: '#42A5F5',
        }
      ]
    };
  }
}
