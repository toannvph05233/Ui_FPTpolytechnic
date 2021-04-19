import {Component, OnInit} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import {Messenger} from './models/messenger';
import {User} from './models/user';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './Services/authentication.service';
import {UserToken} from './models/user-token';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'DoctorAppointmentBookingSystem2';


}
