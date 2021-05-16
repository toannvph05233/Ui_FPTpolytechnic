import { Component, OnInit } from '@angular/core';
import {Apply} from '../models/apply';
import {HttpClient} from '@angular/common/http';
import {UserToken} from '../models/user-token';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  myApplys: Apply[];
  whoApplys: Apply[];
  userToken: UserToken;
  constructor(private http: HttpClient) {
    this.userToken = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit(): void {
  }

  getAllWhoApplyByPost(id) {
    const url = 'http://localhost:8080/apply/allApplyByPost/'+ id;
    this.http.get<Apply[]>(url).subscribe((resJson) => {
      this.whoApplys = resJson;
      console.log('this.whoApplys');
      console.log(this.whoApplys);
    });
  }
}
