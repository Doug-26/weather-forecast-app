import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey: string = environment.weather.apiKey;
  private apiUrl: string = environment.weather.apiUrl;

  constructor(private http : HttpClient) { }

  getWeather(city: string) {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'imperial');
    return this.http.get(this.apiUrl, { params }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
