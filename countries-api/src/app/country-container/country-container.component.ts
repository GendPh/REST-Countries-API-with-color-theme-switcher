import { Component, Input } from '@angular/core';
import { Data } from '../model/countries.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-container',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './country-container.component.html',
  styles: ``
})
export class CountryContainerComponent {
  @Input('GetCountry') country: Data | undefined;
}
