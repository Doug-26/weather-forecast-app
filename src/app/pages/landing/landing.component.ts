import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  constructor(private auth : AuthService, private router : Router) {}

  // Check if the user is authenticated and redirect to home if they are
  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      }
    });
  }

  // Function to handle login
  // Redirects the user to the Auth0 login page
  login() {
    this.auth.loginWithRedirect();
  }
}
