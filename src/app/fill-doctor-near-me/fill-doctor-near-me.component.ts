import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {UserToken} from '../models/user-token';

@Component({
  selector: 'app-fill-doctor-near-me',
  templateUrl: './fill-doctor-near-me.component.html',
  styleUrls: ['./fill-doctor-near-me.component.css']
})
export class FillDoctorNearMeComponent implements OnInit {
  listDoctor: User[];
  userToken: UserToken;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.userToken = JSON.parse(localStorage.getItem('currentUser'));
    this.getAllUserDoctorNearMe();
  }
  getAllUserDoctorNearMe() {
    const url = `http://localhost:8080/allDoctorOrNannyByLocation/${this.userToken.idLocation}/3`;
    this.http.get<User[]>(url).subscribe((resJson) => {
      this.listDoctor = resJson.reverse();
      console.log('this.listPost');
      console.log(this.listDoctor);
      this.getcountFeedback();
      // this.listPost.reverse();
    });

  }

  getcountFeedback(){
    for (let i =0;i<this.listDoctor.length;i++){
      const url = 'http://localhost:8080/feedback/count/'+this.listDoctor[i].id;
      this.http.get<number>(url).subscribe((resJson) => {
        this.listDoctor[i].countFeedback = resJson;
      });
      const url2 = 'http://localhost:8080/feedback/percent/'+this.listDoctor[i].id;
      this.http.get<number>(url2).subscribe((resJson) => {
        this.listDoctor[i].percentFeedback = resJson;
      });
    }
    console.log('this.listDoctor');
    console.log(this.listDoctor);
  }
  bookDoctor(id){
    localStorage.setItem("idDoctorBook",id);
  }
}

