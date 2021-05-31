import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import firebase from 'firebase';
import {DOCUMENT} from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-callvideo',
  templateUrl: './callvideo.component.html',
  styleUrls: ['./callvideo.component.css']
})
export class CallvideoComponent implements OnInit {
  database: any;
  firebaseConfig: any;
  @ViewChild('yourvideo', {static: true}) yourVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('friendsvideo', {static: true}) friendsVideo: ElementRef<HTMLVideoElement>;
  yourId = 11;
  servers: any;
  pc: any;

  constructor() {
    this.readMessage = this.readMessage.bind(this);

    this.firebaseConfig = {
      apiKey: 'AIzaSyAM57F6gywH4LrAw3DnleZ-JRD829azuPk',
      authDomain: 'callvideo3-f0e65.firebaseapp.com',
      databaseURL: 'https://callvideo3-f0e65-default-rtdb.firebaseio.com',
      projectId: 'callvideo3-f0e65',
      storageBucket: 'callvideo3-f0e65.appspot.com',
      messagingSenderId: '1035835722203',
      appId: '1:1035835722203:web:02abe879852c147b447ffe',
      measurementId: 'G-P5Q3N23YHM'
    };

    firebase.initializeApp(this.firebaseConfig);
    this.database = firebase.database().ref();
    console.log('database');
    console.log(this.database);
    console.log('database');

    // this.yourVideo =$('#yourVideo');
    // this.friendsVideo = $('#friendsVideo');

    console.log('this.yourVideo');
    console.log(this.yourVideo);
    console.log('this.yourVideo');
    // this.yourId = Math.floor(Math.random() * 1000000000);
    // var yourId = 11;
    console.log(this.yourId + 'đây là id');


    this.servers = {
      'iceServers': [{'urls': 'stun:stun.services.mozilla.com'},
        {'urls': 'stun:stun.l.google.com:19302'},
        {
          'urls': 'turn:numb.viagenie.ca',
          'credential': 'webrtc',
          'username': 'websitebeaver@mail.com'
        }]
    };
    //tạo mới một đối tượng PeerConnection
    this.pc = new RTCPeerConnection(this.servers);

    //Chờ ICE Candidate được tạo trên máy tính của bạn.
    this.pc.onicecandidate = (event => event.candidate ? this.sendMessage(this.yourId, JSON.stringify({'ice': event.candidate})) : console.log('Sent All Ice'));
    this.pc.onaddstream = (event => this.friendsVideo.nativeElement.srcObject = event.stream);

    this.database.on('child_added', this.readMessage);

    this.showMyFace();


  }

  ngOnInit(): void {
  }


  //Khai báo máy chủ sử dụng ở đây là hai máy chủ STUN
  // của Google và Firefox, tùy nhu cầu mà bạn có thể thêm hoặc bớt.


  sendMessage(senderId, data) {
    //database là database của firebase-- tải dữ liệu lên firebase
    var msg = this.database.push({sender: senderId, message: data});
    msg.remove();
  }

  //Hàm readMessage cho phép đối phương đọc tin nhắn
  readMessage(data) {
    let id = this.yourId;
    console.log('--------------readMessage-----------------');
    console.log(data);
    console.log('-------------------------------');
    var msg = JSON.parse(data.val().message);
    var sender = data.val().sender;
    console.log(sender + 'hình như đây là id của bạn');
    if (sender != id) {
      console.log(msg.ice + ' đây là gì ?');
      if (msg.ice != undefined) {
        this.pc.addIceCandidate(new RTCIceCandidate(msg.ice));
      } else if (msg.sdp.type === 'offer') {
        const r = confirm('Answer call?');
        if (r === true) {
          this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))

            //Người nhận tạo một đối tượng Answer bằng cách gọi hàm pc.createAnswer()
            .then(() => this.pc.createAnswer())

            //Kết quả trả về một đối tượng Answer mà bạn sẽ thiết lập ở mô tả local.
            .then(answer => this.pc.setLocalDescription(answer))

            //Sau đó, người nhận lấy đối tượng Answer và gửi nó cho bạn bằng cách gọi sendMessage.
            .then(() => this.sendMessage(this.yourId, JSON.stringify({'sdp': this.pc.localDescription})));
        } else {
          alert('Rejected the call');
        }
      } else if (msg.sdp.type == 'answer') {
        this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
      }
    }
  };


  showMyFace() {
    alert('vào rồi');
    //truy cập camera và trả về. getUserMedia
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
      .then(stream => this.yourVideo.nativeElement.srcObject = stream)
      .then(stream => this.pc.addStream(stream));
  }

  showFriendsFace() {
    this.pc.createOffer()
      .then(offer => this.pc.setLocalDescription(offer))
      .then(() => this.sendMessage(this.yourId, JSON.stringify({'sdp': this.pc.localDescription})));
  }

}
