import { Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { CountryInfoComponent } from './country-info/country-info.component';

export const routes: Routes = [
  { path: '', component: CountriesComponent, title: 'Countries' },
  { path: 'country/:name', component: CountryInfoComponent, title: 'Country Info' },
  { path: '**', redirectTo: '' }
];
