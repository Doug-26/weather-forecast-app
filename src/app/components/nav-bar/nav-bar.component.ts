import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  
  constructor(private auth: AuthService) { }

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
}
