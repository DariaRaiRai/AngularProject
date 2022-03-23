import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryInfo } from './country-info';

@Injectable({
  providedIn: 'root',
})
export class CovidInfoService {
  constructor(private http: HttpClient) {}

  getCovidInfo(country: string): Observable<CountryInfo> {
    return this.http.get<CountryInfo>(
      `https://diseas3e.sh/v3/covid-19/countries/${country}`
    );
  }
}
