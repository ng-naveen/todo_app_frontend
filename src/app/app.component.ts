import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  isLoggedIn!: boolean;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.authState.subscribe(
      (state) => {
        this.isLoggedIn = state;
      }
    )
    if(this.isLoggedIn) {
      this.router.navigateByUrl('home');
    }
  }
}
