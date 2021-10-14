import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CountriesService } from './countries.service';
import { Country } from './country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  countries: Observable<string[]>;
  title = 'my-app';

  constructor(private countriesService: CountriesService) {}

  ngOnInit() {
    this.countries = this.countriesService.getCountries()
  }
}
