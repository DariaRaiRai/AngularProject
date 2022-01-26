import { createAction, props } from '@ngrx/store';

export const setCountry = createAction(
  '[COUNTRY] Set Country',
  props<{ country: string }>()
);
