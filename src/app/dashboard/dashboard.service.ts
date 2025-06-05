import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly baseUrl = 'http://localhost:8080/users/analyze';

  constructor(private http: HttpClient) {}

  getCandidatosPorEstado(): Observable<any> {
    return this.http.get(`${this.baseUrl}/candidatos-por-estado`);
  }

  getImcMedioPorFaixaEtaria(): Observable<any> {
    return this.http.get(`${this.baseUrl}/imc-medio-por-faixa-etaria`);
  }

  getPercentualObesos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/percentual-obesos`);
  }

  getMediaIdadePorTipoSanguineo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/media-idade-por-tipo-sanguineo`);
  }

  getPossiveisDoadores(): Observable<any> {
    return this.http.get(`${this.baseUrl}/possiveis-doadores`);
  }
}
