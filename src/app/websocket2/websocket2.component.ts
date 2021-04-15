import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {Messenger} from '../models/messenger';
import {UserToken} from '../models/user-token';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../Services/authentication.service';
import {Stomp} from '@stomp/stompjs';

declare var $: any;

@Component({
  selector: 'app-websocket2',
  templateUrl: './websocket2.component.html',
  styleUrls: ['./websocket2.component.css']
})
export class Websocket2Component implements OnInit {

  idRomChat: number;

  title = 'grokonez';
  description = 'Angular-WebSocket Demo';

  userNameFriend = 'toan2';
  greetings: string[] = [];

  disabled = true;
  name: string;
  message = 'ơ kìa';
  private stompClient = null;
  listUserFriend: User[];
  listMessenger: Messenger[];
  currentUser: UserToken;



  constructor(private http: HttpClient,private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
  }


  // connect() {
  //   const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
  //   this.stompClient = Stomp.over(socket);
  //   const thisSocket = this;
  //   this.stompClient.connect({}, function (frame) {
  //     thisSocket.setConnected(true);
  //     console.log('Connected: -----' );
  //     console.log('Connected: ' + frame);
  //
  //     thisSocket.stompClient.subscribe('/topic/hii', function (hello) {
  //       thisSocket.showGreeting(JSON.parse(hello.body).greeting);
  //     });
  //   });
  // }
  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  async showChatModal(id, userNameFriend) {
    const idRom = await this.connect(userNameFriend);
    const mess = await this.getAllMessengerByIdRom();
    $('#modalChat' + id).modal('show');

  };

  // test() {
  //   console.log(this.userNameFriend);
  //   this.userNameFriend = 'johntoan982';
  //   console.log(this.userNameFriend);
  // }

  async connect(userNameFriend) {
    console.log("--------------------");
    console.log(userNameFriend);
    console.log(this.currentUser.username);
    console.log("--------------------");
    let username = this.currentUser.username;
    const createRom = await this.createRomChat(this.currentUser.username, userNameFriend);
    const getRom = await this.getRomChat(this.currentUser.username, userNameFriend);
    let idRomChat = this.idRomChat;
    let message = this.message;

    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    this.stompClient = Stomp.over(socket);
    const thisSocket = this;

    this.stompClient.connect({}, function(frame) {
      console.log("--------------------");
      console.log("đã vào connect");
      console.log("--------------------");
      thisSocket.setConnected(true);

      thisSocket.stompClient.subscribe('/topic/public/' + idRomChat, function() {
        thisSocket.showGreeting();
      });

      thisSocket.stompClient.send('/gkz/chatVsUser', {},
        JSON.stringify({'name': username, 'userNameFriend': userNameFriend}));

    });
  }

  getAllMessengerByIdRom() {
    console.log('------------------------');
    console.log('Bạn vào getAllMessenger');
    console.log('------------------------');
    const url = 'http://localhost:8080/api/allChat/' + this.idRomChat;
    this.http.get<Messenger[]>(url).subscribe((resJson) => {
      this.listMessenger = resJson;
      console.log(this.listMessenger);
    });
  }

  getAllFriend() {
    const url = 'http://localhost:8080/api/allFriendById/' + this.currentUser.id;
    this.http.get<User[]>(url).subscribe((resJson) => {
      this.listUserFriend = resJson;
      console.log(this.listUserFriend);
    });
  }

  async getRomChat(userName1, userName2) {
    console.log('------------------------');
    console.log('Bạn vào getRoomChat');
    console.log('------------------------');
    const url = 'http://localhost:8080/api/findRomChat/' + userName1 + '/' + userName2;
    this.idRomChat = await this.http.get<number>(url).toPromise();
    console.log('-----------------------------');
    console.log(this.idRomChat);
    console.log('-----------------------------');

  }

  createRomChat(userName1, userName2) {
    console.log('------------------------');
    console.log('Bạn vào CreateRomChat');
    console.log('------------------------');
    const url = 'http://localhost:8080/api/addRomchat/' + userName1 + '/' + userName2;
    this.http.get(url).subscribe((resJson) => {
      console.log('tạo phòng oke');
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    console.log('------------------------');
    console.log('Bạn vào SendMess');
    console.log(this.message);
    console.log('------------------------');
    console.log(this.stompClient);
    this.stompClient.send(
      '/gkz/chat.newUser',
      {},
      JSON.stringify({'name': this.currentUser.username, 'message': this.message})
    );
    this.message = '';
  }

  showGreeting() {
    this.getAllMessengerByIdRom();
  }

  ngOnInit(): void {
    // this.getAllFriend();
  }
}
