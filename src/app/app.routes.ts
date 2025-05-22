import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { WeatherComponent } from './pages/weather/weather.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'weather', component: WeatherComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: ''} // Redirect to landing page for any unknown routes
];
