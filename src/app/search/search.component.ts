import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { debounce, filter } from 'rxjs/operators';
import { CountriesService } from '../countries.service';
import { setCountry } from '../country.actions';

interface CountryState {
  country: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  country: string;
  countriesControl = new FormControl();
  filteredCountries: string[] = [];

  constructor(
    private CountriesService: CountriesService,
    private store: Store<CountryState>
  ) {}

  ngOnInit(): void {
    this.store.select('country').subscribe((country: string) => {
      this.country = country;
    });

    this.countriesControl.valueChanges
      .pipe(
        debounce(() => timer(400)),
        filter((v: string) => v.length >= 2)
      )
      .subscribe(this.search.bind(this));
  }

  search(term: string) {
    this.CountriesService.search(term).subscribe(
      (countries: string[]) => (this.filteredCountries = countries)
    );
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.store.dispatch(setCountry({ country: event.option.value }));
  }

  onFocus(event: Event) {
    (event.target as HTMLInputElement).setSelectionRange(0, 100);
  }
}
