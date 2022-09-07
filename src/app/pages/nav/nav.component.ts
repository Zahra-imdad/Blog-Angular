import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLogged:boolean=false;
  token:any
  constructor(private router:Router,private authService:AuthService) {
   }

  ngOnInit(): void {
    this.login()
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('uid')
    this.router.navigate(['/login'])
  }
  login(){
    this.token = localStorage.getItem('token')
    if(this.token){
      this.userLogged=true;
    }
    else{
      this.userLogged=false
    }
  }

}