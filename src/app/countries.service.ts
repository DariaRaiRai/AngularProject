import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { filter, map, reduce, switchMap, take } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<string[]> {
    const savedCountries = localStorage.getItem('countries');
    if (savedCountries) {
      return of(JSON.parse(savedCountries));
    } else {
      return this.http
        .get<Country[]>('https://disease.sh/v3/covid-19/countries')
        .pipe(
          map((countries: Country[]) => {
            const res = countries.map((c) => c.country);
            localStorage.setItem('countries', JSON.stringify(res));
            return res;
          })
        );
    }
  }

  search(term: string) {
    return this.getCountries().pipe(
      switchMap((countries) => from(countries)),
      filter(this.filterCountriesByText(term)),
      take(5),
      reduce((acc, country) => [...acc, country], [] as string[])
    );
  }

  private filterCountriesByText(text: string) {
    return (country: string) => {
      let found = false;
      if (text.length) {
        const lettersIndexes = text
          .toLowerCase()
          .split('')
          .map((letter) => country.toLowerCase().indexOf(letter));
        found =
          lettersIndexes.every((index) => index !== -1) &&
          lettersIndexes.join('') === lettersIndexes.sort().join('');
      }

      return found;
    };
  }
}
