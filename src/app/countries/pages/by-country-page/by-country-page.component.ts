import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-country-page',
  standalone: false,

  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue: string = '';
  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ) {};

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.queryTerm;

  }

  searchCountry( term: string): void {
    this.isLoading = true;

    this.countriesService.searchCountry(term)
      .subscribe((resp) => {
        this.countries = resp;
        this.isLoading = false;
      });;
  }
}
