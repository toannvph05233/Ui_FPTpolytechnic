import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../models/user';
import {UserToken} from '../models/user-token';
import {Post} from '../models/post';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Stomp} from '@stomp/stompjs';
import {Messenger} from '../models/messenger';
import {Apply} from '../models/apply';
import {NotificationService} from '../Services/notificationService';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {ChatService} from "../Services/chatService";

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('uploadFile', { static: true }) public avatarDom: ElementRef | undefined;
  userToken: UserToken;
  post: Post;
  listPost: Post[];
  contentPost: string;
  statusPost: number = 1;
  arrayPicture = '';


  constructor(private http: HttpClient,private storage: AngularFireStorage,
              private router: Router, private notificationService: NotificationService,public chatSerice: ChatService) {
  }

  ngOnInit(): void {
    this.userToken = JSON.parse(localStorage.getItem('currentUser'));
    this.chatSerice.currentUser = this.userToken;
    this.chatSerice.http = this.http;

    this.getAllPost();
    this.notificationService.connect(this.userToken.idLocation);
  }

  getAllPost() {
    const url = 'http://localhost:8080/post/allPostNotApply/' + this.userToken.id;
    this.http.get<Post[]>(url).subscribe((resJson) => {
      this.listPost = resJson.reverse();
      console.log('this.listPost');
      console.log(this.listPost);
    });
  }

  applyPost(id) {
    let apply = {
      'postEntity': {
        'id': id
      },
      'appUser': {
        'id': this.userToken.id
      },
      'date': '2021-04-19'
    };
    const url = 'http://localhost:8080/apply/create';
    this.http.post(url, apply).subscribe((resJson) => {
      alert('apply thành công');
      this.getAllPost();
    });
  }

  showMess = true;

  showandHideMess() {
    if (this.showMess) {
      $('#bodyMess').hide();
      this.showMess = false;
    } else {
      $('#bodyMess').show();
      this.showMess = true;
    }

  }




  selectedImage: any = null;


  submit() {
    if (this.selectedImage != null) {
      const filePath=this.selectedImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {this.arrayPicture = url})))
      ).subscribe();
    }
  }

  uploadFileImg() {
    this.selectedImage = this.avatarDom?.nativeElement.files[0];
    this.submit();
  }



  savePost() {
    this.post = {
      id: null,
      createAt: null,
      content: this.contentPost,
      status: this.statusPost,
      user: {id: this.userToken.id},
      imgs: this.arrayPicture
    };
    const url = 'http://localhost:8080/post/create';
    console.log(this.post);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('create thành công');
      this.getAllPost();
      this.arrayPicture='';
    }, error => {
      alert('create lỗi');
    });
    this.notificationService.sendNotification('đã có tạo 1 bài post mới');
  }







}
