import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries() {
    const savedCountries = localStorage.getItem('countries');
    if (savedCountries) {
      return of(JSON.parse(savedCountries));
    } else {
      return this.http
        .get<Country[]>('https://corona.lmao.ninja/v2/countries')
        .pipe(
          map((countries: Country[]) => {
            const countriesList = countries.map((c) => c.country);
            localStorage.setItem('countries', JSON.stringify(countriesList));
            return countriesList;
          })
        );
    }
  }
}
