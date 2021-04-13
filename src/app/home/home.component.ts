import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserToken} from '../models/user-token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userToken: UserToken;
  constructor() { }

  ngOnInit(): void {
    this.userToken = JSON.parse(localStorage.getItem('currentUser'));

  }

}
