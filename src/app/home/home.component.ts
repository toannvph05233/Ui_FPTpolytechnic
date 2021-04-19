import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserToken} from '../models/user-token';
import {Post} from '../models/post';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Stomp} from '@stomp/stompjs';
import {Messenger} from '../models/messenger';
import {Apply} from '../models/apply';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userToken: UserToken;
  post: Post;
  listPost: Post[];

  idRomChat: number;
  disabled = true;
  message = 'ơ kìa';
  private stompClient = null;
  notification='';
  myApplys: Apply[];
  whoApplys: Apply[];

  contentPost: string;
  statusPost:number;
  arrayPicture = 'https://ruthamcauquan2.info/wp-content/uploads/2020/07/anh-gai-xinh-hap-dan-nhieu-nam-gioi-16.jpg';


  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.userToken = JSON.parse(localStorage.getItem('currentUser'));
    this.getAllPost();
    this.connect();
    this.getAllMyApply();

  }
  getAllPost() {
    const url = 'http://localhost:8080/post/allPost';
    this.http.get<Post[]>(url).subscribe((resJson) => {
      this.listPost = resJson;
      console.log('this.listPost');
      console.log(this.listPost);
      // this.listPost.reverse();
    });
  }
  getAllMyApply() {
    const url = 'http://localhost:8080/apply/allApplyByUser/'+ this.userToken.id;
    this.http.get<Apply[]>(url).subscribe((resJson) => {
      this.myApplys = resJson;
      console.log('this.myApplys');
      console.log(this.myApplys);
    });
  }

  getAllWhoApplyByPost(id) {
    const url = 'http://localhost:8080/apply/allApplyByPost/'+ id;
    this.http.get<Apply[]>(url).subscribe((resJson) => {
      this.whoApplys = resJson;
      console.log('this.whoApplys');
      console.log(this.whoApplys);
    });
  }

  applyPost(id){
    let apply =  {
      "postEntity": {
        "id": id
      },
      "appUser": {
        "id": this.userToken.id
      },
      "date": "2021-04-19"
    }
    const url = 'http://localhost:8080/apply/create';
    this.http.post(url,apply).subscribe((resJson) => {
      alert("apply thành công")
    });
  }



  showMess = true;
  showandHideMess(){
    if (this.showMess){
      $('#bodyMess').hide();
      this.showMess = false;
    } else {
      $('#bodyMess').show();
      this.showMess = true;
    }

  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      console.log("đã kết nối");
    }
  }

  connect() {
    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    this.stompClient = Stomp.over(socket);
    const thisSocket = this;
    let user = this.userToken;

    this.stompClient.connect({}, function(frame) {
      console.log('--------------------');
      console.log('đã vào connect');
      console.log('--------------------');
      thisSocket.setConnected(true);

      thisSocket.stompClient.subscribe('/topic/public/' + user.idLocation, function(data) {
        console.log(data.body);
        thisSocket.notification = data.body;
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendNotification() {
    console.log('------------------------');
    console.log('Bạn vào SendMess');
    console.log('------------------------');

    this.stompClient.send(
      '/gkz/notification',
      {},
      JSON.stringify({'userName': this.userToken.username, 'content': ' thêm 1 bài post mới'})
    );
  }

  savePost() {
    this.post = {id: null, createAt: null,content: this.contentPost, status: this.statusPost, user: {id:this.userToken.id}, imgs: this.arrayPicture};
    const url = 'http://localhost:8080/post/create';
    console.log(this.post);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('create thành công');
    }, error => {
      alert('create lỗi');
    });
    this.sendNotification();
  }
}
