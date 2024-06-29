import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { grid } from 'ldrs'

@Component({
  selector: 'app-country-loader',
  standalone: true,
  imports: [],
  templateUrl: './country-loader.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CountryLoaderComponent implements OnInit {
  ngOnInit(): void {
    grid.register();
  }

}
