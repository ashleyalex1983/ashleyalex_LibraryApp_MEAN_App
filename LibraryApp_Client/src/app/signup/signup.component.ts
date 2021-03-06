import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ValidatePassword } from './must-match/validate-password';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  submitted = false;
  errorMsg:String=null;
  successMsg:String=null;

  user = {user_name:'',user_email:'',user_password:''};

  signupform = new FormGroup(
    {
      fullname: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]*")]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)]),
      confirmPassword : new FormControl('',Validators.required)

    },this.passwordMatchValidate //,{validators: this.passwordMatchValidate}
  )

  passwordMatchValidate(frm: FormGroup){
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : {'mismatch': true};
  }

  get myform(){
    return this.signupform.controls;
  }

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(){
    this.user = {user_name:'',user_email:'',user_password:''};
  }

  signupUser(){
    this.submitted = true;
    this._auth.signupUser(this.user)
      .subscribe(
        res=>{
        if(res.success){
          //Success
          this.successMsg = res.message + '....Redirecting to Login';
          //navigate to login
          setTimeout(()=>{
            this._router.navigate(['login']);
          },2000);
        }
        else{
          //Error
          this.errorMsg =res.message;
          this.resetForm();
        }
      })
      this.errorMsg=null;
  }

}
