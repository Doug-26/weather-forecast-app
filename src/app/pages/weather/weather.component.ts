import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [DecimalPipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  todayDate: string = '';

  constructor(
    // Injecting the ActivatedRoute to get route parameters
    private route: ActivatedRoute,
    // Injecting the WeatherService to fetch weather data
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    // Getting the city parameter from the route
    // this.route.queryParams.subscribe(params => {
    //   this.city = params['city'];
    //   if (this.city) {
    //     this.weatherData = null; // Reset weather data before fetching new data
    //     this.weatherService.getWeather(this.city).subscribe(data => {
    //       this.weatherData = data;
    //     }, error => {
    //       console.error('Error fetching weather data:', error);
    //       this.weatherData = null; // Reset weather data on error
    //     });
    //   }
    // })

    console.log('WeatherComponent initialized');
    // Getting the city parameter from the route
    this.route.queryParams.subscribe(params => {
      this.city = params['city'] || '';
      if (this.city) {
        this.weatherData = null; // Reset weather data before fetching new data

        const now = new Date();
        // Formatting the date as MM/DD/YYYY
        this.todayDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
        console.log('Current date:', this.todayDate);

        this.weatherService.getWeather(this.city).subscribe({
          // Handling the response 
          next: (data) => {
            this.weatherData = data;
          },
          error: (error) => {
            console.error('Error fetching weather data:', error);
          }
        });
      }
    });

  }

}
