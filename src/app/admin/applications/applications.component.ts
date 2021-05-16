import { Component, OnInit } from '@angular/core';
import {Apply} from '../../models/apply';
import {UserToken} from '../../models/user-token';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  whoApplys: Apply[];
  userToken: UserToken;

  constructor(private http: HttpClient) {
    this.userToken = JSON.parse(localStorage.getItem('currentUser'));
    this.getAllWhoApply();
  }

  ngOnInit(): void {
  }

  getAllWhoApply() {
    const url = 'http://localhost:8080/apply/allWhoApply/' + this.userToken.id;
    this.http.get<Apply[]>(url).subscribe((resJson) => {
      this.whoApplys = resJson;
      console.log('this.whoApplys');
      console.log(this.whoApplys);
    });
  }

  deleteApply(id){
    const url = 'http://localhost:8080/apply/delete/'+ id;
    this.http.get(url).subscribe((resJson) => {
      alert("delete thành công")
      this.getAllWhoApply();
    });
  }
  acceptApply(idPost,idApply){
    let recruit =  {
      "postEntity": {
        "id": idPost
      },
      "applyEntity": {
        "id": idApply
      },
      "date": "2021-04-19"
    }
    const url = 'http://localhost:8080/recruitment/create';
    this.http.post(url,recruit).subscribe((resJson) => {
      alert("apply thành công")
    });
  }
}

