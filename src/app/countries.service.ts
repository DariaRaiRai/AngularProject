import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http
      .get<Country[]>('https://corona.lmao.ninja/v2/countries')
      .pipe(map((countries: Country[]) => countries.map((c) => c.country)));
  }
}
