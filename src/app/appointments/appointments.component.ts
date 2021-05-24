import {Component, OnInit} from '@angular/core';
import {UserToken} from '../models/user-token';
import {HttpClient} from '@angular/common/http';
import {Booking} from '../models/booking';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  listBooking: Booking[];
  userToken: UserToken;


  constructor(private http: HttpClient) {
    this.userToken = JSON.parse(localStorage.getItem('currentUser'));
    console.log('this.userToken');
    console.log(this.userToken);
    this.getAllBookByIdDoctor();
  }

  ngOnInit(): void {
  }

  getAllBookByIdDoctor() {
    const url = 'http://localhost:8080/book/allByDoctorStatusFalse/' + this.userToken.id;
    this.http.get<any>(url).subscribe((resJson) => {
      this.listBooking = resJson.reverse();
      console.log('this.listBooking');
      console.log(this.listBooking);
    });
  }

  acceptBooking(id) {
    const url = 'http://localhost:8080/book/acceptBook/' + id;
    this.http.get<any>(url).subscribe((resJson) => {
      alert('accept thành công');
      this.getAllBookByIdDoctor();
    }, error => {
      alert('accept lỗi');
    });
  }
}
