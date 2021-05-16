import {Component, OnInit} from '@angular/core';
import {Apply} from '../../models/apply';
import {UserToken} from '../../models/user-token';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {
  myApplys: Apply[];
  userToken: UserToken;

  constructor(private http: HttpClient) {
    this.userToken = JSON.parse(localStorage.getItem('currentUser'));
    this.getAllMyApply();
  }

  ngOnInit(): void {
  }

  getAllMyApply() {
    const url = 'http://localhost:8080/apply/allApplyByUser/' + this.userToken.id;
    this.http.get<Apply[]>(url).subscribe((resJson) => {
      this.myApplys = resJson;
      console.log('this.myApplys');
      console.log(this.myApplys);
    });
  }

  deleteApply(id){
    const url = 'http://localhost:8080/apply/delete/'+ id;
    this.http.get(url).subscribe((resJson) => {
      alert("delete thành công")
      this.getAllMyApply();
    });
  }

}
