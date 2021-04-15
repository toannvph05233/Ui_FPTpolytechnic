import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {UserToken} from '../../models/user-token';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userToken: UserToken;
  constructor(private toastrService : ToastrService ) { }

  ngOnInit(): void {
    this.userToken = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.userToken);
  }
    logout(){
      localStorage.removeItem('currentUser');
      this.userToken = null;
  }

}
