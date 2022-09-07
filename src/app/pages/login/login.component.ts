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
  disabled:boolean=true
  email:string= ''
  password:string=''
  id:string=''
  loginError=false
  Loading=false
  fg:any = new FormControl()
  fb = new FormBuilder()

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
  login(){
   
    this.loginError=false
    this.Loading=true
    console.log(this.fg.value)
    this.authService.login(this.id,this.fg.value.email,this.fg.value.password).subscribe((data:any)=>{
      console.log(`LOGIN SUCESS`,data)
      localStorage.setItem('token',data.token)
      localStorage.setItem('uid',data.id)
      this.router.navigate(['/home'])
    },
    err=>{
      this.loginError=true
      console.log(err.message)
    },()=>{
      this.Loading=false;
    })
  }
  get EmailInput(){
    return this.fg.get('email')
  }
  get PasswordInput(){
    return this.fg.get('password')
  }

 
}
