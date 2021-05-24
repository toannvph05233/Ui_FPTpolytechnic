import {Stomp} from '@stomp/stompjs';
import {UserToken} from '../models/user-token';

export class NotificationService {
  disabled = true;
  private stompClient = null;
  notification = '';
  userToken = JSON.parse(localStorage.getItem('currentUser'));


  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      console.log('đã kết nối');
    }
  }

  connect(room) {
    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    this.stompClient = Stomp.over(socket);
    const thisSocket = this;
    let user = this.userToken;

    this.stompClient.connect({}, function(frame) {
      console.log('------- -------------');
      console.log('đã vào connect');
      console.log('--------------------');
      thisSocket.setConnected(true);

      thisSocket.stompClient.subscribe('/topic/public/' + room, function(data) {
        alert(data.body);
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

  sendNotification(noti) {
    console.log('------------------------');
    console.log('Bạn vào SendMess');
    console.log('------------------------');

    this.stompClient.send(
      '/gkz/notification',
      {},
      JSON.stringify({'userName': this.userToken.username, 'content': noti})
    );
  }
}
