import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NavBarComponent, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  city: string = '';
  user: any;

  constructor(public auth : AuthService, private router : Router) { 
    // Subscribe to the user data from AuthService
    this.auth.user$.subscribe(userData => {
      this.user = userData;
    });

  }

  getWeather() {
    // Logic to get weather data for the specified city
    // This could involve making an API call to a weather service
    console.log(`Getting weather for ${this.city}`);
  }
}
