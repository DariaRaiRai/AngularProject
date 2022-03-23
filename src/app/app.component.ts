import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CovidInfo } from './country-info';
import { CovidInfoService } from './covid-info.service';
import { HttpRequestState } from './http-request-state';

interface AppState {
  country: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  country: string;
  covidInfo: HttpRequestState<CovidInfo> | null;
  covidInfoLoading: boolean;
  error: boolean;

  constructor(
    private store: Store<AppState>,
    private covidInfoService: CovidInfoService
  ) {}

  ngOnInit() {
    this.store.select('country').subscribe((country: string) => {
      this.country = country;
      if (country) {
        this.getCovidInfo(country);
      }
    });
  }

  getCovidInfo(country: string) {
    this.covidInfoService
      .getByCountry(country)
      .subscribe(
        (countryInfo: HttpRequestState<CovidInfo>) =>
          (this.covidInfo = countryInfo)
      );
  }
}
