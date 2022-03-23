import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs/operators';
import { CountryInfo } from './country-info';
import { CovidInfoService } from './covid-info.service';

interface AppState {
  country: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  country: string;
  countryInfo: CountryInfo | null;
  countryInfoLoading: boolean;
  error: boolean;

  constructor(
    private store: Store<AppState>,
    private covidInfoService: CovidInfoService
  ) {
    this.store.select('country').subscribe((country: string) => {
      this.country = country;
      if (country) {
        this.getCountryInfo(country);
      }
    });
  }

  getCountryInfo(country: string) {
    this.error = false;
    this.countryInfo = null;
    this.countryInfoLoading = true;

    this.covidInfoService
      .getCovidInfo(country)
      .pipe(finalize(() => (this.countryInfoLoading = false)))
      .subscribe(
        (countryInfo: CountryInfo) => {
          this.countryInfo = countryInfo;
        },
        () => {
          this.error = true;
        }
      );
  }
}
