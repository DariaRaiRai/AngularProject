import { Action, createReducer, on } from '@ngrx/store';
import { setCountry } from './country.actions';

const reducer = createReducer(
  '',
  on(setCountry, (state, { country }) => country)
);

export const countryReducer = reducer;
