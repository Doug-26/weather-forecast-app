import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-weather',
  imports: [NavBarComponent, CommonModule, ErrorComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  todayDate: string = '';
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private weatherService: WeatherService,
  ) { }

  ngOnInit() {
    // Getting the city parameter from the route
    this.route.queryParams.subscribe(params => {
      this.city = params['city'] || '';
      if (this.city) {
        const now = new Date();
        // Formatting the date as MM/DD/YYYY
        this.todayDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

        this.weatherService.getWeather(this.city).subscribe({
          // Handling the response 
          next: (data) => {
            this.weatherData = data;

            // Delay the loading state for 1 second
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          },
          error: (error) => {
            this.loading = false;
            this.error = true;
          }
        });
      }
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
