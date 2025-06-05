import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BarChartComponent,
    MatCardModule,
    MatListModule,
    MatExpansionModule
  ],
  template: `
  <h2 style="text-align: center;">Menu Dashboard</h2>

  <mat-card class="chart-card">
    <mat-card-title (click)="toggle('Candidatos')">Candidatos por Estado</mat-card-title>
    <mat-card-content *ngIf="showSections['Candidatos']">
      <app-bar-chart [data]="candidatosPorEstado"></app-bar-chart>
      <ul>
        <li *ngFor="let estado of candidatosPorEstado | keyvalue">
          {{ estado.key }}: {{ estado.value }}
        </li>
      </ul>
    </mat-card-content>
  </mat-card>

  <mat-card class="chart-card">
    <mat-card-title (click)="toggle('Imc')">IMC Médio por Faixa Etária</mat-card-title>
    <mat-card-content *ngIf="showSections['Imc']">
      <app-bar-chart [data]="imcPorFaixaEtaria"></app-bar-chart>
      <ul>
        <li *ngFor="let faixa of imcPorFaixaEtaria | keyvalue">
          {{ faixa.key }}: {{ faixa.value }}
        </li>
      </ul>
    </mat-card-content>
  </mat-card>

  <mat-card class="chart-card">
    <mat-card-title (click)="toggle('Obesos')">Percentual de Obesos</mat-card-title>
    <mat-card-content *ngIf="showSections['Obesos']">
      <app-bar-chart [data]="percentualObesos"></app-bar-chart>
      <ul>
        <li *ngFor="let sexo of percentualObesos | keyvalue">
          {{ sexo.key }}: {{ sexo.value }}%
        </li>
      </ul>
    </mat-card-content>
  </mat-card>

  <mat-card class="chart-card">
    <mat-card-title (click)="toggle('Idade')">Média de Idade por Tipo Sanguíneo</mat-card-title>
    <mat-card-content *ngIf="showSections['Idade']">
      <app-bar-chart [data]="mediaIdadePorTipo"></app-bar-chart>
      <ul>
        <li *ngFor="let tipo of mediaIdadePorTipo | keyvalue">
          {{ tipo.key }}: {{ tipo.value }} anos
        </li>
      </ul>
    </mat-card-content>
  </mat-card>

  <mat-card class="chart-card">
    <mat-card-title (click)="toggle('Doadores')">Possíveis Doadores</mat-card-title>
    <mat-card-content *ngIf="showSections['Doadores']">
      <app-bar-chart [data]="possiveisDoadores"></app-bar-chart>
      <ul>
        <li *ngFor="let tipo of possiveisDoadores | keyvalue">
          {{ tipo.key }}: {{ tipo.value }}
        </li>
      </ul>
    </mat-card-content>
  </mat-card>
`
,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  candidatosPorEstado: { [key: string]: number } = {};
  imcPorFaixaEtaria: { [key: string]: number } = {};
  percentualObesos: { [key: string]: number } = {};
  mediaIdadePorTipo: { [key: string]: number } = {};
  possiveisDoadores: { [key: string]: number } = {};

  showSections: { [key: string]: boolean } = {
    Candidatos: false,
    Imc: false,
    Obesos: false,
    Idade: false,
    Doadores: false
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getCandidatosPorEstado().subscribe(data => this.candidatosPorEstado = data);
    this.dashboardService.getImcMedioPorFaixaEtaria().subscribe(data => this.imcPorFaixaEtaria = data);
    this.dashboardService.getPercentualObesos().subscribe(data => this.percentualObesos = data);
    this.dashboardService.getMediaIdadePorTipoSanguineo().subscribe(data => this.mediaIdadePorTipo = data);
    this.dashboardService.getPossiveisDoadores().subscribe(data => this.possiveisDoadores = data);
  }

  toggle(section: string): void {
    this.showSections[section] = !this.showSections[section];
  }
}
