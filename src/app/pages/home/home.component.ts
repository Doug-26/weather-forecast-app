import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-home',
  imports: [NavBarComponent, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  city: string = '';
  user: any;
  isCityEmpty: boolean = false;
  citySuggestions: any[] = [];
  showDropdown: boolean = false;

  private searchSubject = new Subject<string>();
  private searchSub!: Subscription;

  constructor(
    public auth: AuthService,
    private router: Router,
    private weatherService: WeatherService
  ) {
    this.auth.user$.subscribe(userData => {
      this.user = userData;
    });
  }

  ngOnInit() {
    this.searchSub = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.weatherService.searchCities(query))
    ).subscribe(results => {
      this.citySuggestions = results;
      this.showDropdown = results.length > 0;
    });
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }

  onCityInput() {
    this.searchSubject.next(this.city);
  }

  selectCity(suggestion: any) {
    this.city = suggestion.name;
    this.showDropdown = false;
    this.citySuggestions = [];
  }

  hideDropdown() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  displayWeather() {
    this.showDropdown = false;
    this.router.navigate(['/weather'], { queryParams: { city: this.city } });
  }

  displayError() {
    this.isCityEmpty = true;
    setTimeout(() => {
      this.isCityEmpty = false;
    }, 3000);
  }
}
