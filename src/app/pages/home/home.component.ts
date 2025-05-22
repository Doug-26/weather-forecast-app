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
  isCityEmpty: boolean = false;

  constructor(public auth : AuthService, private router : Router) { 
    // Subscribe to the user data from AuthService
    this.auth.user$.subscribe(userData => {
      this.user = userData;
    });

  }

  displayWeather() {
    this.router.navigate(['/weather'], { queryParams: { city: this.city } });
  }

  displayError() {
    // setTimeout to simulate loading time
    this.isCityEmpty = true;
    setTimeout(() => {
      this.isCityEmpty = false;
    }, 3000);

  }
}
