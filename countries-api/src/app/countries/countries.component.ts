import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../services/countries.service';
import { CountryContainerComponent } from '../country-container/country-container.component';
import { CountryLoaderComponent } from '../country-loader/country-loader.component';
import { ActivatedRoute } from '@angular/router';
import { CountryFailedComponent } from '../country-failed/country-failed.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, CountryLoaderComponent, SearchComponent, CountryContainerComponent, CountryFailedComponent],
  templateUrl: './countries.component.html',
})
export class CountriesComponent implements OnInit, OnDestroy {
  constructor(public countriesService: CountriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params != null && params['region'] != null) {
        const region = params['region'];
        this.loadCountriesByRegion(region);
      } else {
        this.loadAllCountries();
      }
    });
  }

  ngOnDestroy(): void {
    this.countriesService.resetSearch();
  }

  private loadAllCountries(): void {
    this.countriesService.getCountries().subscribe(
      {
        next: (data) => {
          this.countriesService.countriesSignal.update(prev => [...data]);
        },
        error: () => {
          this.countriesService.countriesLoadedFailed.update(prev => true);
        },
        complete: () => {
          setTimeout(() => {
            this.countriesService.countriesLoaded.update(prev => true);
          }, 500);
        }
      }
    );
  }
  private loadCountriesByRegion(region: string): void {
    this.countriesService.getCountriesByRegion(region).subscribe(
      {
        next: (data) => {
          this.countriesService.countriesSignal.update(prev => [...data]);
        },
        error: () => {
          this.countriesService.countriesLoadedFailed.update(prev => true);
        },
        complete: () => {
          setTimeout(() => {
            this.countriesService.countriesLoaded.update(prev => true);
          }, 500);
        }
      }
    );
  }
}