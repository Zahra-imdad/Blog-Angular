import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 username:string = ''
 email:string= ''
  password:string=''
  registerError=false
  fg:any = new FormControl()
  fb = new FormBuilder()
  nameInput:any = null
  emailInput:any = null
  passwordInput:any = null
  userRegistered:boolean=false
  Loading:boolean=false;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      username: ['',[Validators.required,Validators.minLength(4)]],
      email: ['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
    // this.fg = new FormGroup({
    //   username :new FormControl('',[Validators.required,Validators.minLength(4)]),
    //   email:new FormControl('',[Validators.required,Validators.email])
    // })
  }
 
  register(){
    if(this.fg.valid){
      this.Loading=true
      this.fg.valueChanges.subscribe((data:any)=>{console.log(data)})
      console.log("registered")
      this.authService.register(this.fg.value.username,this.fg.value.email,this.fg.value.password).subscribe((data)=>{
        console.log(data)
        this.router.navigate(['/login'])
      },err=>{
        this.userRegistered=true
        console.log(err.message)
      },()=>{
        this.Loading=false;
      })
    }else{
      this.registerError=true
    }
    // this.nameInput = new FormControl('',[Validators.required,Validators.minLength(4)])
    // this.emailInput = new FormControl('',[Validators.required,Validators.email])
    // this.passwordInput = new FormControl('',[Validators.required,Validators.minLength(4)])
    console.log(this.fg.valid)
    

  }
  get UsernameInput(){
    return this.fg.get('username')
  }
  get EmailInput(){
    return this.fg.get('email')
  }
  get PasswordInput(){
    return this.fg.get('password')
  }
}
