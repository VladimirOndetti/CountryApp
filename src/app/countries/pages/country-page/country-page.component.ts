import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  standalone: false,

  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit {

  public country?: Country;
  public languages?: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        // tap(console.log)
        switchMap( ({id}) => this.countryService.searchcountryByAphaCode(id) )
      )
      .subscribe( country => {
        if(!country) {
          return this.router.navigateByUrl('');
        }

        console.log("Tenemos un pais: ",country);

        this.country = country;
        this.languages = Object.keys(country.translations);;

        return;
      })
  }

}
