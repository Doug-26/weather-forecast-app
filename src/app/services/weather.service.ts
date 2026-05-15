import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey: string = environment.weather.apiKey;
  private apiUrl: string = environment.weather.apiUrl;
  private geoUrl: string = 'https://api.openweathermap.org/geo/1.0/direct';

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

  searchCities(query: string): Observable<any[]> {
    if (!query || query.trim().length < 2) {
      return of([]);
    }
    const params = new HttpParams()
      .set('q', query.trim())
      .set('limit', '5')
      .set('appid', this.apiKey);
    return this.http.get<any[]>(this.geoUrl, { params }).pipe(
      catchError(() => of([]))
    );
  }
}
