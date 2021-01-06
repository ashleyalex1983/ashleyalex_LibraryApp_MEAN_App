import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title: String = "Welcome "+ this._auth.getUserName();

  constructor(private _auth : AuthService) { }

  ngOnInit(): void {
  }

}
