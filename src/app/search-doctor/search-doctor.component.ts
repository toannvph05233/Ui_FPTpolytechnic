import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../models/post';
import {User} from '../models/user';

@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.css']
})
export class SearchDoctorComponent implements OnInit {
  listDoctor: User[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllUserDoctor();
  }
  getAllUserDoctor() {
    const url = 'http://localhost:8080/userDoctor';
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
