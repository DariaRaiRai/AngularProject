import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CovidInfo } from './country-info';

@Injectable({
  providedIn: 'root',
})
export class CovidInfoService {
  constructor(private http: HttpClient) {}

  getCovidInfo(country: string): Observable<CovidInfo> {
    return this.http.get<CovidInfo>(
      `https://disease.sh/v3/covid-19/countries/${country}`
    );
  }
}
