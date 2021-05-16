import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserToken} from '../models/user-token';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctor-booking',
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.css']
})
export class DoctorBookingComponent implements OnInit {
  doctor: User;
  userToken: UserToken;
  listFeedback: any;
  booking: any;

  constructor(private http: HttpClient,private router: Router) {
    this.userToken = JSON.parse(localStorage.getItem('currentUser'));
    this.getAllBookByIdDoctor();

  }

  ngOnInit(): void {
  }

  getAllBookByIdDoctor() {
    const url = 'http://localhost:8080/book/getBook/' + this.userToken.id;
    this.http.get<any>(url).subscribe((resJson) => {
      this.booking = resJson;
      console.log('this.booking');
      console.log(this.booking);
      this.getFeedback();
      this.getDoctor();
      this.getcountFeedback();
    });
  }

  getFeedback() {
    const url = 'http://localhost:8080/feedback/allFeedback/' + this.booking.idDoctor;
    this.http.get<any>(url).subscribe((resJson) => {
      this.listFeedback = resJson;
    });
  }
  getDoctor() {
    const url = 'http://localhost:8080/findUser/' + this.booking.idDoctor;
    this.http.get<User>(url).subscribe((resJson) => {
      this.doctor = resJson;
    });
  }
  deleteBook() {
    const url = 'http://localhost:8080/book/deleteBook/' + this.booking.id;
    this.http.get<void>(url).subscribe((resJson) => {
      alert("delete thành công")
      this.router.navigate(['/index']);

    });
  }
  getcountFeedback() {
    const url = 'http://localhost:8080/feedback/count/' + this.booking.idDoctor;
    this.http.get<number>(url).subscribe((resJson) => {
      this.doctor.countFeedback = resJson;
    });
    const url2 = 'http://localhost:8080/feedback/percent/' + this.booking.idDoctor;
    this.http.get<number>(url2).subscribe((resJson) => {
      this.doctor.percentFeedback = resJson;
    });
  }

}
