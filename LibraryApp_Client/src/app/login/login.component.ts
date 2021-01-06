import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg:String;
  successMsg:String;

  user = {user_email:'',user_password:''};

  loginform = new FormGroup({
    email : new FormControl('',[Validators.email,Validators.required]),
    password : new FormControl('',[Validators.minLength(8),Validators.required])
  })

  get f(){
    return this.loginform.controls;
  }

  constructor(private _auth:AuthService,
              private _router : Router) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(){
    this.user = {user_email:'',user_password:''};
  }

  loginUser(){
    this._auth.loginUser(this.user)
      .subscribe(
        res =>{
          if(res.success){
            localStorage.setItem('token',res.token);
            localStorage.setItem('user_name',res.user.user_name);
            localStorage.setItem('user_role',res.user.user_role);
            //Success
            this.successMsg = res.message +'...Redirecting to Dashboard';
            //navigate to dashboard
            setTimeout(()=>{
              this._router.navigate(['dashboard']);
            },2000)
          }
          else{
            //Error
            this.errorMsg = res.message;
            this.resetForm();
          }
      });
      this.errorMsg=null
  }

}
