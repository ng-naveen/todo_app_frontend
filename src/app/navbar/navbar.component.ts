import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  logout() {
    localStorage.removeItem('token');
    this.userService.updateAuthState(false);
    this.router.navigateByUrl('');
  }
}
