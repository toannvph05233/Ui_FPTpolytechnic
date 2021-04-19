import { Component, OnInit } from '@angular/core';
import {UserToken} from '../../models/user-token';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userToken: UserToken;
  constructor() { }

  ngOnInit(): void {
    this.userToken = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.userToken);
  }

}
