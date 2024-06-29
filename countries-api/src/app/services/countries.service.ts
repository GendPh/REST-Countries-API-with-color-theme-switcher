import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Data, Region } from '../model/countries.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  // hold the url of the data
  private url: string = 'assets/data.json';

  // hold the data of the countries
  public countriesSignal = signal<Data[]>([]);
  // hold the data of the countries after search
  public countriesSearchSignal = signal<Data[] | null>(null);
  // hold the data of the country
  public countrySignal = signal<Data | null>(null);

  // signal to indicate that the countries data is loaded or failed to load
  public countriesLoaded = signal<boolean>(false);
  public countriesLoadedFailed = signal<boolean>(false);
  
  // signal to indicate that the country data is loaded or failed to load
  public countryLoaded = signal<boolean>(false);
  public countryLoadedFailed = signal<boolean>(false);

  constructor(private http: HttpClient) { }

  // Method to get the regions of the countries
  public getRegions(): Observable<Region[]> {
    return this.http.get<Data[]>(this.url).pipe(
      map((data: Data[]) => {
        // get the regions of the countries and remove the duplicates using Set
        const regions = data.map((country: Data) => country.region);
        return [...new Set(regions)];
      })
    );
  }
  // Method to get the countries data
  public getCountries(): Observable<Data[]> {
    // reset the loading statements
    this.resetCountriesLoadingStatements();
    // get the data from the url and return it
    return this.http.get<Data[]>(this.url);
  }
  // Method to get the country data by name
  public getCountry(name: string): Observable<Data | undefined> {
    // reset the loading statements
    this.resetCountryLoadingStatements();

    // get the data from the url and return the country with the same name
    return this.http.get<Data[]>(this.url).pipe(
      map((data: Data[]) => {
        return data.find((country: Data) => country.name === name);
      })
    );
  }
  // Method to get the countries names by code 
  public getCountriesNamesByCode(codes: string[]): Observable<string[]> {
    return this.http.get<Data[]>(this.url).pipe(
      map((data: Data[]) => {
        // get the countries names by code and return it
        const countriesName: string[] = data.filter((country: Data) => codes.includes(country.alpha3Code)).map((country: Data) => country.name);
        return countriesName;
      })
    );
  }
  // Method to get the countries data by region
  public getCountriesByRegion(region: string): Observable<Data[]> {
    // reset the loading statements
    this.resetCountriesLoadingStatements()
    // get the data from the url and return the countries with the same region
    return this.http.get<Data[]>(this.url).pipe(
      map((data: Data[]) => {
        return data.filter((country: Data) => country.region === region);
      })
    );
  }
  // Method to filter the countries by search name
  public filterBySearchName(search: string): void {
    // get the all the countries data or all the countries that have been filtered by region
    const countries = this.countriesSignal();
    // if the search is empty reset the search signal
    if (search.trim() === '') {
      this.countriesSearchSignal.update(prev => null);
    } else {
      // filter the countries by search name and update the search signal
      this.countriesSearchSignal.update(prev => countries.filter((country: Data) => country.name.toLowerCase().includes(search.toLowerCase())));
    }
  }
  // Method to reset the loading statements of the countries
  private resetCountriesLoadingStatements(): void {
    this.countriesLoaded.update(prev => false);
    this.countriesLoadedFailed.update(prev => false);
  }
  // Method to reset the loading statements of the country
  private resetCountryLoadingStatements(): void {
    this.countryLoaded.update(prev => false);
    this.countryLoadedFailed.update(prev => false);
  }
  // Method to reset the search of the countries
  public resetSearch(): void {
    this.countriesSearchSignal.update(prev => null);
  }
}
