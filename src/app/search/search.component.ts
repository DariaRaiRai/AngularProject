import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { from, Observable, of } from 'rxjs';
import { filter, reduce, switchMap, take } from 'rxjs/operators';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchValue: string = '';
  countriesControl = new FormControl();
  countries: Observable<string[]>;
  filteredCountries: string[] = [];
  searchedLetters: string[] = [];

  constructor(private CountriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.CountriesService.getCountries();

    this.countriesControl.valueChanges
      .pipe(switchMap((value) => (value.length >= 2 ? of(value) : of(''))))
      .subscribe((value) => {
        this.countries
          .pipe(
            switchMap((countries) => from(countries)),
            filter(this.filterCountriesByText(value)),
            take(5),
            reduce((acc, country) => [...acc, country], [] as string[])
          )
          .subscribe((countries) => (this.filteredCountries = countries));
      });
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

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.CountriesService.selectedCountry = event.option.value;
  }

  onBlur() {
    console.log('-->', 'b');
    console.log('-->', this.countries);
    console.log('-->', this.countriesControl.value);
    // this.countries.subscribe((countries) => {
    //   if (!countries.includes(this.countriesControl.value)) {
    //     this.countriesControl.setValue('', { emitEvent: true });
    //   }
    // });
  }

  onFocus() {
    console.log('-->', 'f');
    // this.countries.subscribe((countries) => {
    //   if (!countries.includes(this.countriesControl.value)) {
    //     this.countriesControl.setValue('', { emitEvent: true });
    //   }
    // });
  }
}