import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { filter, map, reduce, switchMap, take } from 'rxjs/operators';
import { Country } from './country';
import { filterByFuzzyTextMatch } from './utils';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  maximumReturnedItems: number = 5;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<string[]> {
    let savedCountries: string[] | null = null;

    try {
      savedCountries = JSON.parse(
        sessionStorage.getItem('countries') || 'null'
      );
    } catch (e) {
      console.error(e);
    }

    if (savedCountries) {
      return of(savedCountries);
    } else {
      return this.http
        .get<Country[]>('https://disease.sh/v3/covid-19/countries')
        .pipe(
          map((countries: Country[]) => {
            const res = countries.map((c) => c.country);
            sessionStorage.setItem('countries', JSON.stringify(res));
            return res;
          })
        );
    }
  }

  search(term: string) {
    return this.getCountries().pipe(
      switchMap((countries) => from(countries)),
      filter(filterByFuzzyTextMatch(term)),
      take(this.maximumReturnedItems),
      reduce((acc, country) => acc.concat(country), [] as string[])
    );
  }
}
