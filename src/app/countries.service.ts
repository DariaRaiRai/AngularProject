import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  public country: string | null = null;

  getCountries() {
    const savedCountries = JSON.parse(localStorage.getItem('countries') || '');
    if (savedCountries) {
      return of(savedCountries);
    } else {
      return this.http
        .get<Country[]>('https://corona.lmao.ninja/v2/countries')
        .pipe(map((countries: Country[]) => countries.map((c) => c.country)));
    }
  }

  get selectedCountry() {
    return this.country;
  }

  set selectedCountry(country: string | null) {
    this.country = country;
  }
}
