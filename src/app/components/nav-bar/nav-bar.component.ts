import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  
  isAuthenticated: boolean = false;

  constructor(private auth: AuthService, private router : Router) { 
    // Subscribe to the authentication status
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  // Function to handle login
  // Redirects the user to the Auth0 login page
  login() {
    this.auth.loginWithRedirect();
  }

  // Function to handle logout
  // Redirects the user to the Auth0 logout page
  logout() {
    this.auth.logout();
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
