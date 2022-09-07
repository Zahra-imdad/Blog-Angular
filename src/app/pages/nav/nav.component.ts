import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  userLogged: boolean = false;
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {}
  logout() {
    localStorage.removeItem('token');
    //localStorage.removeItem('uid')
    this.router.navigate(['/login']);
    this.authService.isLoggedIn = false;
  }
}
