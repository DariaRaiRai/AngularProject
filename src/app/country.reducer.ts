import { createReducer, on } from '@ngrx/store';
import { setCountry } from './country.actions';

const reducer = createReducer(
  '',
  on(setCountry, (_, { country }) => country)
);

export const countryReducer = reducer;
