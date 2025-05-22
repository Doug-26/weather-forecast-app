import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey: string = '7242caf136d86086a3b95c91546e6c4f';
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather'; 

  constructor(private http : HttpClient) { }

  // Function to get weather data for a specific city
  getWeather(city: string) {  
    // Constructing the URL with the city name and API key
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=imperial`;
    return this.http.get(url).pipe(
      catchError((error) => {
        // Handle errors here
        console.error('Error fetching weather data:', error);
        throw error; // Rethrow the error to be handled by the calling component
      })
    );
  }
}
