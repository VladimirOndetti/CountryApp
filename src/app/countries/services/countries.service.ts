import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { catchError, Observable, of, tap, map, delay } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      queryTerm: '',
      countries: []
    },
    byCountries: {
      queryTerm: '',
      countries: []
    },
    byRegion: {
      region: '',
      countries: []
    },
  }
  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
   }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify(this.cacheStore));
  }
  private loadFromLocalStorage() {
    if(!localStorage.getItem('cacheStore')) return

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error => {
          console.log(error);

          return of([])
        }),
        // delay(2000)
      )
  }

  searchcountryByAphaCode( code: string): Observable<Country | null> {
    console.log("searchcountryByAphaCode", code);
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError(error => {
          return of(null)
        })
      )
  }

  searchByCapital( queryTerm: string): Observable<Country[]> {
    console.log("searchCapital", queryTerm);
    const url = `${this.apiUrl}/capital/${queryTerm}`;

    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCapital = {queryTerm, countries}),
      tap(() => this.saveToLocalStorage()),
    );
  }

  searchCountry( queryTerm: string): Observable<Country[]> {
    console.log("searchCountry", queryTerm);
    const url = `${this.apiUrl}/name/${queryTerm}`;

    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountries = {queryTerm, countries}),
      tap(() => this.saveToLocalStorage()),
    );
  }

  searchByRegion( queryTerm: Region): Observable<Country[]> {
    console.log("searchByRegion", queryTerm);
    const url = `${this.apiUrl}/region/${queryTerm}`;

    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = {region: queryTerm, countries}),
      tap(() => this.saveToLocalStorage()),
    );
  }

}
