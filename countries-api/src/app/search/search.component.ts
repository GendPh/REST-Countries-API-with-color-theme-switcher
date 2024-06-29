import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit {

  public regions: string[] = [];

  public search: string = '';

  constructor(private countriesService: CountriesService, private router: Router) { }

  ngOnInit(): void {
    this.countriesService.getRegions().subscribe(
      {
        next: (regions) => {
          this.regions = regions;
        },
        error: () => {
          this.regions = ["Error loading regions"];
        }
      }
    )
  }

  public getCountriesByRegion(region: string): void {
    this.router.navigate(['/'], { queryParams: { region: region } });
  }
  public noRegion(): void {
    this.router.navigate(['/']);
  }
  public searchCountry(): void {
    this.countriesService.filterBySearchName(this.search);
  }
}