import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router:Router, public _auth:AuthService) { }

  ngOnInit(): void {
  }

  logOutUser(){
    localStorage.removeItem('token');
    localStorage.clear();
    this._router.navigate(['home']);
  }

}
