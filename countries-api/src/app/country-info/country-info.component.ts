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

  languages: string = "";
  borderCountries: string[] = [];

  constructor(public countryService: CountriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetInfo();

    this.route.params.subscribe(params => {
      const name = params['name'];
      this.countryService.getCountry(name).subscribe({
        next: (data) => {
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
            this.countryService.countryLoadedFailed.update(prev => true);
          }
        },
        error: () => {
          this.countryService.countryLoadedFailed.update(prev => true);
        },
        complete: () => {
          setTimeout(() => {
            this.countryService.countryLoaded.update(prev => true);
          }, 500);
        }
      });
    });
  }

  private resetInfo(): void {
    this.languages = "";
    this.borderCountries = [];
  }

}
