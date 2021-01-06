import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseURL = 'http://localhost:3000';

  //heroku hosted server url
  // readonly baseURL = 'https://ashley-lib-server.herokuapp.com';

  constructor(private http: HttpClient) { }

  signupUser(user:any){
    return this.http.post<any>(this.baseURL + '/user/signup',user);
  }

  loginUser(user:any){
    return this.http.post<any>(this.baseURL + '/user/login',user)
  }

  //checks whether the token exists in localStorage
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUserName(){
    return localStorage.getItem('user_name');
  }

  isAdmin(){
    var user_role = localStorage.getItem('user_role');
    if(user_role === "admin")
    {
      return true;
    }
    else{
      return false;
    }
  }
}
