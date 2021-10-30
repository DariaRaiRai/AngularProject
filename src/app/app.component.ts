import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setCountry } from './country.actions';

interface AppState {
  country: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  country: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.country = this.store.select('country');
  }

  setUkraine() {
    this.store.dispatch(setCountry({ country: 'Ukraine' }));
  }

  setRussia() {
    this.store.dispatch(setCountry({ country: 'Russia' }));
  }
}
