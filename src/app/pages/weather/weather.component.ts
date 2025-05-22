import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-weather',
  imports: [NavBarComponent, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  todayDate: string = '';
  loading: boolean = true;

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
            console.error('Error fetching weather data:', error);
          }
        });
      }
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
