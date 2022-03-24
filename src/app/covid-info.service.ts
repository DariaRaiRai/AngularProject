import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { CovidInfo } from './country-info';
import { HttpRequestState } from './http-request-state';

@Injectable({
  providedIn: 'root',
})
export class CovidInfoService {
  constructor(private http: HttpClient) {}

  getByCountry(country: string): Observable<HttpRequestState<CovidInfo>> {
    return this.http
      .get<CovidInfo>(`https://disease.sh/v3/covid-19/countries/${country}`)
      .pipe(
        map((data: CovidInfo) => ({ data, loading: false })),
        catchError(() => of({ loading: false, error: true })),
        startWith({ loading: true })
      );
  }
}
