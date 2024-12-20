import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  get username() {
    return this.loginForm.get('username');
  }


  get password() {
    return this.loginForm.get('password');
  }


  onSubmit(): void {
    let observableResponse = this.userService.login(this.loginForm.value);
    observableResponse.subscribe(
      (response: any) => {
        localStorage.setItem('token', `Token ${response.token}`);
        this.userService.updateAuthState(true);
        this.router.navigateByUrl('home');
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
