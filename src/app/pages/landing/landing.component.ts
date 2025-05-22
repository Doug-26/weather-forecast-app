import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-landing',
  imports: [NavBarComponent, SpinnerComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  
  loading: boolean = true;
  
  constructor(private auth : AuthService, private router : Router) {}

  // Check if the user is authenticated and redirect to home if they are
  ngOnInit() {
    // Simulate loading time
    setTimeout(() => {
      this.loading = false;
    }, 1500);

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
