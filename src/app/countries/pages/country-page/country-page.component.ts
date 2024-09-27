import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country, Translation } from '../../interfaces/country';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  public translations: Translation[] = [];

  constructor(
      private activatedRoute: ActivatedRoute,
      private countriesService: CountriesService,
      private router: Router
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id)),
      map<any,any>(country => {
        const translation = Object.values(country?.translations);
        return [country, translation];

      })
    )
    .subscribe( ([country, translation]) => {
      if( !country ) return this.router.navigateByUrl('');

      this.translations = translation

     // console.log({translation})
      return this.country = country;

    })
  }

}
