import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  standalone: false,

  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegions?: Region;

  constructor( private countriesService: CountriesService ) {};

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegions = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion( region: Region): void {
    this.isLoading = true;
    this.selectedRegions = region;

    this.countriesService.searchByRegion(region)
      .subscribe((resp) => {
        this.countries = resp;
        this.isLoading = false;
      });;
  }
}
