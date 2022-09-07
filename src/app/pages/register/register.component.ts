import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerError = false;
  fg: any = new FormControl();
  fb = new FormBuilder();
  clicked: boolean = false;
  userRegistered: boolean = false;
  Loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fg = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get UsernameInput() {
    return this.fg.get('username');
  }
  get EmailInput() {
    return this.fg.get('email');
  }
  get PasswordInput() {
    return this.fg.get('password');
  }

  register() {
    this.clicked = true;
    if (this.fg.valid) {
      this.Loading = true;
      this.fg.valueChanges.subscribe((data: any) => {
        console.log(data);
      });
      this.authService
        .register(
          this.fg.value.username,
          this.fg.value.email,
          this.fg.value.password
        )
        .subscribe(
          (data) => {
            this.router.navigate(['/login']);
          },
          (err) => {
            this.userRegistered = true;
            console.log(err.message);
          },
          () => {
            this.Loading = false;
          }
        );
    } else {
      this.registerError = true;
    }
  }
}
