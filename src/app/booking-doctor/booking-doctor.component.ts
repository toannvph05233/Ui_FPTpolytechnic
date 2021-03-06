import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {UserToken} from '../models/user-token';
import {NotificationService} from '../Services/notificationService';
import {log} from 'util';

@Component({
  selector: 'app-booking-doctor',
  templateUrl: './booking-doctor.component.html',
  styleUrls: ['./booking-doctor.component.css']
})
export class BookingDoctorComponent implements OnInit {
  idDoctorBook: number;
  listBooking: any[];
  doctor: User;
  today: any;
  date: Date;
  dateBooking = new Date();
  timeBooking = 1;
  comment: string;
  userToken: UserToken;
  listFeedback: any;
  sizeCheckBooking: number;



  constructor(private http: HttpClient,private notificationService: NotificationService) {
    this.userToken = JSON.parse(localStorage.getItem('currentUser'));
    this.idDoctorBook = parseInt(localStorage.getItem('idDoctorBook'));
    this.getDoctor();
    this.getAllBookByIdDoctor();
    this.date = new Date();
    this.today = this.date.getDate();
    this.getFeedback();
    this.getcountFeedback();
    console.log("this.notificationService")
    console.log("this.notificationService")
    console.log(this.notificationService)
  }

  ngOnInit(): void {
  }

  getAllBookByIdDoctor() {
    const url = 'http://localhost:8080/book/allByDoctorStatusFalse/' + this.idDoctorBook;
    this.http.get<any>(url).subscribe((resJson) => {
      this.listBooking = resJson.reverse();
      console.log('this.listBooking');
      console.log(this.listBooking);
    });
  }

  getDoctor() {
    const url = 'http://localhost:8080/findUser/' + this.idDoctorBook;
    this.http.get<any>(url).subscribe((resJson) => {
      this.doctor = resJson;
    });
  }

  getFeedback() {
    const url = 'http://localhost:8080/feedback/allFeedback/' + this.idDoctorBook;
    this.http.get<any>(url).subscribe((resJson) => {
      this.listFeedback = resJson;
    });
  }

  async bookingDoctor() {
    let check = await this.checkBooking2();
    let strDate = '' + this.dateBooking;
    let dayBook = strDate.slice(strDate.length - 2, strDate.length);
    if (this.checkBooking(dayBook, this.timeBooking)) {
      alert('b???n booking tr??ng v???i ng?????i kh??c r???i!');
    } else {
      if (this.sizeCheckBooking != 0) {
        alert('b???n ???? c?? 1 booking kh??c r???i!');
      } else {
        let booking = {
          'idDoctor': this.idDoctorBook,
          'comment': this.comment,
          'date': this.dateBooking,
          'timeEntity': {'id': this.timeBooking},
          'user': {'id': this.userToken.id}
        };
        console.log('booking');
        console.log(booking);
        const url = 'http://localhost:8080/book/create';
        this.http.post(url, booking).subscribe((resJson) => {
          alert('create th??nh c??ng');
          this.notificationService.sendNotification("booking 1 b??c s?? ")
        }, error => {
          alert('create l???i');
        });
      }
    }
  }

  getcountFeedback() {
    const url = 'http://localhost:8080/feedback/count/' + this.idDoctorBook;
    this.http.get<number>(url).subscribe((resJson) => {
      this.doctor.countFeedback = resJson;
    });
    const url2 = 'http://localhost:8080/feedback/percent/' + this.idDoctorBook;
    this.http.get<number>(url2).subscribe((resJson) => {
      this.doctor.percentFeedback = resJson;
    });
  }


  checkBooking(day, time): boolean {
    for (let i = 0; i < this.listBooking.length; i++) {
      let dayBook = this.listBooking[i].date.slice(this.listBooking[i].date.length - 2, this.listBooking[i].date.length);
      if (this.listBooking[i].timeEntity.id == time && day == dayBook) {
        return true;
      }
    }
    return false;
  }

  checkBooking2() {
    const url2 = 'http://localhost:8080/book/checkBook/' + this.userToken.id;
    this.http.get<Object[]>(url2).subscribe((resJson) => {
      this.sizeCheckBooking = resJson.length;
    });
  }

}
