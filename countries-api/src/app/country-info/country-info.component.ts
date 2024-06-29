import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CountryLoaderComponent } from '../country-loader/country-loader.component';
import { CountryFailedComponent } from '../country-failed/country-failed.component';

@Component({
  selector: 'app-country-info',
  standalone: true,
  imports: [CommonModule, RouterLink, CountryLoaderComponent, CountryFailedComponent],
  templateUrl: './country-info.component.html',
})
export class CountryInfoComponent implements OnInit {

  // hold the languages of the country and the border countries
  languages: string = "";
  borderCountries: string[] = [];

  constructor(public countryService: CountriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // reset the info of the country when the component is initialized
    this.resetInfo();

    // get the name of the country from the route parameters
    this.route.params.subscribe(params => {
      const name = params['name'];
      // get the country data by name
      this.countryService.getCountry(name).subscribe({
        next: (data) => {
          // if the data is not null update the country signal and get the languages and the border countries
          if (data) {
            this.countryService.countrySignal.update(prev => data);
            this.languages = data.languages.map(language => language.name).join(', ');

            if (data.borders) {
              this.countryService.getCountriesNamesByCode(data.borders).subscribe({
                next: (countries) => {
                  this.borderCountries = countries;
                }
              });
            }
          } else {
            // if the data is null update the country loaded failed signal
            this.countryService.countryLoadedFailed.update(prev => true);
          }
        },
        // if there is an error update the country loaded failed signal
        error: () => {
          this.countryService.countryLoadedFailed.update(prev => true);
        },
        // when the data is loaded update the country loaded signal
        complete: () => {
          setTimeout(() => {
            this.countryService.countryLoaded.update(prev => true);
          }, 500);
        }
      });
    });
  }
  
  // method to reset the info of the country
  private resetInfo(): void {
    this.languages = "";
    this.borderCountries = [];
  }

}
