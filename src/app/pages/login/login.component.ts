import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id:string=''
  loginError=false
  Loading=false
  fg:any = new FormControl()
  fb = new FormBuilder()
  clicked:boolean=false;

  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
   this.Validators()
   if(this.authService.getToken()){
    this.router.navigate(['/home'])
   }
  }

  Validators(){
    this.fg = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }
  get EmailInput(){
    return this.fg.get('email')
  }
  get PasswordInput(){
    return this.fg.get('password')
  }

  login(){
    this.clicked = true
    this.loginError=false
    this.Loading=true
    console.log(this.id)
    this.authService.login(this.id,this.fg.value.email,this.fg.value.password).subscribe((data:any)=>{
      console.log(`LOGIN SUCESS`,data)
      localStorage.setItem('token',data.token)
      localStorage.setItem('uid',this.id)
      this.router.navigate(['/home'])
      this.authService.isLoggedIn=true;
    },
    err=>{
      this.loginError=true
      this.Loading=false;
      console.log(err.message)
    })
  }
  

 
}
