import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  get username() {
    return this.registrationForm.get('username');
  }


  get email() {
    return this.registrationForm.get('email');
  }


  get password() {
    return this.registrationForm.get('password');
  }


  onSubmit(): void {
    let observableResponse = this.userService.register(this.registrationForm.value);
    observableResponse.subscribe(
      (response) => {
        this.router.navigateByUrl('');
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
