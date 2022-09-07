import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }

  public notifyLogin$ = new Subject()
  public notifyId$ = new Subject();
  isLoggedIn = localStorage.getItem("token") ? true : false;

  getToken(){
    let token = localStorage.getItem('token');
    if(token) this.notifyLogin$.next(true);
    return token;
  }
  getLocalStorage(){
    this.notifyId$.next(true)
    return localStorage.getItem('uid')
  }
  login(id:any,email:string,password:string){
    return this.httpClient.post(`http://localhost:3000/login/login`,{id,email,password})
  }
  register(username:string,email:string,password:string){
    return this.httpClient.post(`http://localhost:3000/register/register`,{username,email,password})
  }
}
